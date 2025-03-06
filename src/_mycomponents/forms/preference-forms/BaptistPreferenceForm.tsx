'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import AudioPlayer from "@/_mycomponents/common/AudioPlayer";
import { useRouter } from 'next/navigation';

interface VocalItem {
  id: string;
  name: string;
  checked: boolean;
  duration: string;
  audioFile: string;
}

interface SectionState {
  isOpen: boolean;
  items: VocalItem[];
}

export default function BaptistPreferenceForm() {
  // State for section visibility
  const [sections, setSections] = useState({
    Processional: true,
    Recessional : true,
    CongregationalHymn1: true,
    greatAmen: true,
    lambOfGod: true,
    recessional: true,
  });

  // State for all sections
  const [vocalSections, setVocalSections] = useState({
    startOfRosary: [
      { id: '1', name: 'Vocal Name 1', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '2', name: 'Vocal Name 2', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '3', name: 'Vocal Name 3', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '4', name: 'Vocal Name 4', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
    ],
    Processional: [
      { id: '1', name: 'Vocal Name 1', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '2', name: 'Vocal Name 2', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '3', name: 'Vocal Name 3', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
    ],
    Recessional : [
      { id: '1', name: 'Vocal Name 1', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '2', name: 'Vocal Name 2', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '3', name: 'Vocal Name 3', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
    ],
    CongregationalHymn1: [
      { id: '1', name: 'Vocal Name 1', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '2', name: 'Vocal Name 2', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '3', name: 'Vocal Name 3', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
    ],
    greatAmen: [
      { id: '1', name: 'Vocal Name 1', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '2', name: 'Vocal Name 2', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '3', name: 'Vocal Name 3', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
    ],
    recessional: [
      { id: '1', name: 'Vocal Name 1', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '2', name: 'Vocal Name 2', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '3', name: 'Vocal Name 3', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
    ],
  });

  const [additionalOptions, setAdditionalOptions] = useState({
    viewingMusic: false,
    filterMusicPreMass: false,
    placingOfSymbols: false,
  });

  const router = useRouter();
  const handlePrevious = () => {
    // Navigate back to the previous page
    router.back();
  };

  const updateVocalSection = (section: string, id: string, checked: boolean) => {
    setVocalSections((prev: any) => ({
      ...prev,
      [section]: prev[section].map((item: VocalItem) =>
        item.id === id 
          ? { ...item, checked } 
          : { ...item, checked: false } // uncheck all other items in the section
      )
    }));
  };

  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    
    // Navigate to final video page
  
  };
  const handleNext=()=>{
    router.push('/final-video');
  }
  const SectionHeader = ({ title, section }: { title: string; section: keyof typeof sections }) => (
    <div
      className="flex items-center justify-between cursor-pointer py-2"
      onClick={() => toggleSection(section)}
    >
      <h3 className="text-sm font-medium">{title}</h3>
      <ChevronDown
        className={`w-4 h-4 transition-transform ${sections[section] ? 'transform rotate-180' : ''}`}
      />
    </div>
  );

  const renderVocalItems = (section: string, items: VocalItem[]) => (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
          <Checkbox
            id={`${section}-${item.id}`}
            checked={item.checked}
            onCheckedChange={(checked) => updateVocalSection(section, item.id, checked as boolean)}
          />
          <div className="flex-1">
            <label
              htmlFor={`${section}-${item.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {item.name}
            </label>
          </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.duration}</p>
            <button type='button'>
          <AudioPlayer audioUrl={`/audio/${item.audioFile}`} />
            </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto shadow-lg rounded-md p-4 bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-5 mt-5 text-gray-900 dark:text-white">Baptist Service Preferences</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pre Service */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Pre Service</h3>
          <div className="bg-[#E7E7E7] dark:bg-gray-700 p-3 rounded">
            <span className="text-sm text-gray-800 dark:text-gray-200">Instrumental (20 minutes)</span>
          </div>
        </div>

        {/* Processional */}
        <div className="space-y-2 border dark:border-gray-700 rounded-md p-4">
          <SectionHeader title="Processional" section="Processional" />
          {sections.Processional && (
            renderVocalItems('Processional', vocalSections.Processional)
          )}
        </div>

        {/* Congregational Hymn */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Congregational Hymn</h3>
          <Select>
            <SelectTrigger className="w-full text-sm bg-[#E7E7E7] dark:bg-gray-700 dark:text-gray-200">
              <SelectValue placeholder="Select Hymn" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
              <SelectItem value="hymn1" className="dark:text-gray-200">Hymn 1</SelectItem>
              <SelectItem value="hymn2" className="dark:text-gray-200">Hymn 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recessional */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Recessional</h3>
          {sections.Recessional && (
            renderVocalItems('Recessional', vocalSections.Recessional)
          )}
        </div>

        {/* Additional Options */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={additionalOptions.viewingMusic}
              onCheckedChange={(checked) => setAdditionalOptions(prev => ({ ...prev, viewingMusic: checked as boolean }))}
              className="rounded-sm"
            />
            <span className="text-sm text-gray-800 dark:text-gray-200">Viewing music</span>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={additionalOptions.filterMusicPreMass}
              onCheckedChange={(checked) => setAdditionalOptions(prev => ({ ...prev, filterMusicPreMass: checked as boolean }))}
              className="rounded-sm"
            />
            <span className="text-sm text-gray-800 dark:text-gray-200">Filter Music pre-mass: Vocal</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button onClick={handlePrevious} variant="outline" className="text-sm dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Previous</Button>
          <Button onClick={handleNext} type="submit" className="text-sm">Next</Button>
        </div>
      </form>
    </div>
  );
}
