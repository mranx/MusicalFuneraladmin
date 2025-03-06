import { NextRequest, NextResponse } from 'next/server';
import { generatePassword, hashPassword } from '@/lib/password'; // You'll need to create these
import { sendLoginCredentials } from '@/lib/email'; // You'll need to create this
import prisma from '@/lib/database'; // You'll need to set up Prisma

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      // Form data
      directorName, directorCompany, directorEmail,
      name, email, phone, relation,
      deceasedName, dateOfBirth, dateOfPassing, specialRequests,
      // Service data - this will come from the form submission
      servicePlan, servicePrice
    } = body;

    // Validate required fields
    if (!email || !name || !phone || !relation || !deceasedName || !dateOfBirth || !dateOfPassing || !servicePlan || !servicePrice) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields. Please check that all required information is provided.' 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          success: false,
          error: 'A user with this email already exists. Please use a different email address or contact support.' 
        },
        { status: 409 }
      );
    }

    // Generate password for the user
    const password = generatePassword();
    const hashedPassword = await hashPassword(password);

    // Create the user with all the form data including the service plan
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        relation,
        directorName: directorName || null,
        directorCompany: directorCompany || null,
        directorEmail: directorEmail || null,
        deceasedName,
        dateOfBirth: new Date(dateOfBirth),
        dateOfPassing: new Date(dateOfPassing),
        specialRequests: specialRequests || null,
        servicePlan,  // Store the selected service plan
        servicePrice: parseFloat(servicePrice.toString()),  // Store the price
      },
    });

    // Send login credentials via email
    await sendLoginCredentials(email, password, {
      servicePlan,
      servicePrice,
      deceasedName,
      dateOfBirth,
      dateOfPassing
    });

    // Return success without the password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ 
      success: true,
      message: 'Registration successful. Please check your email for login credentials.',
      user: userWithoutPassword
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Provide more specific error messages when possible
    let errorMessage = 'An error occurred during registration. Please try again later.';
    
    if (error instanceof Error) {
      // Custom error handling based on error type
      if (error.message.includes('Unique constraint')) {
        errorMessage = 'This email is already registered. Please use a different email address.';
      } else if (error.message.includes('database')) {
        errorMessage = 'Database connection issue. Please try again later.';
      } else if (error.message.includes('email')) {
        errorMessage = 'We were unable to send the login email. Please try again or contact support.';
      }
      
      // In development, you might want to include the actual error for debugging
      // In production, you should remove or log this but not send to client
      // errorMessage = `${errorMessage} (${error.message})`;
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}