"use client";
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

export default function CatholicPreferenceForm() {
  const router = useRouter();
  const [sections, setSections] = useState({
    startOfRosary: true,
    penitentialRite: true,
    responsorialPsalm: true,
    offertoryProcession: true,
    holyHoly: true,
    memorialAcclamation: true,
    greatAmen: true,
    lambOfGod: true,
    recessional: true,
  });

  const [vocalSections, setVocalSections] = useState({
    startOfRosary: [
      { id: '1', name: 'Vocal Name 1', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '2', name: 'Vocal Name 2', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '3', name: 'Vocal Name 3', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '4', name: 'Vocal Name 4', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
    ],
    offertoryProcession: [
      { id: '1', name: 'Vocal Name 1', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '2', name: 'Vocal Name 2', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '3', name: 'Vocal Name 3', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
    ],
    holyHoly: [
      { id: '1', name: 'Vocal Name 1', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '2', name: 'Vocal Name 2', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
      { id: '3', name: 'Vocal Name 3', checked: false, duration: '0:30 sec', audioFile: 'audio.mp3' },
    ],
    memorialAcclamation: [
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

  const updateVocalSection = (section: string, id: string, checked: boolean) => {
    setVocalSections((prev: any) => ({
      ...prev,
      [section]: prev[section].map((item: VocalItem) =>
        item.id === id 
          ? { ...item, checked } 
          : { ...item, checked: false } 
      )
    }));
  };

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev: any) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, section }: { title: string; section: keyof typeof sections }) => (
    <div
      className="flex items-center justify-between cursor-pointer py-2"
      onClick={() => toggleSection(section)}
    >
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</h3>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    
    // Navigate to final video page

  };
  const handleNext=()=>{
    router.push('/final-video');
  }
  const handlePrevious = () => {
    // Navigate back to the previous page
    router.back();
  };

  return (
    <div className="max-w-4xl mx-auto shadow-lg rounded-md p-4 bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-5 mt-5 text-gray-900 dark:text-white">Fill out the form below:</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pre Service */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Pre Service</h3>
          <div className="bg-[#E7E7E7] dark:bg-gray-700 p-3 rounded">
            <span className="text-sm text-gray-800 dark:text-gray-200">Instrumental (20 minutes)</span>
          </div>
        </div>

        {/* Start of Rosary */}
        <div className="space-y-2 border dark:border-gray-700 rounded-md p-4">
          <SectionHeader title="Start of Rosary" section="startOfRosary" />
          {sections.startOfRosary && (
            renderVocalItems('startOfRosary', vocalSections.startOfRosary)
          )}
        </div>

        {/* Penitential Rite */}
        <div className="space-y-2">
          <SectionHeader title="Penitential Rite" section="penitentialRite" />
          {sections.penitentialRite && (
            <Select>
              <SelectTrigger className="w-full text-sm bg-[#E7E7E7] dark:bg-gray-700 dark:text-gray-200">
                <SelectValue placeholder="Lord Have Mercy Vocal" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                <SelectItem value="lord-have-mercy" className="dark:text-gray-200">Lord Have Mercy Vocal</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Responsorial Psalm */}
        <div className="space-y-2">
          <SectionHeader title="Responsorial Psalm" section="responsorialPsalm" />
          {sections.responsorialPsalm && (
            <Select>
              <SelectTrigger className="w-full text-sm bg-[#E7E7E7] dark:bg-gray-700 dark:text-gray-200">
                <SelectValue placeholder="The Lord is My Shepherd Vocal" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                <SelectItem value="shepherd" className="dark:text-gray-200">The Lord is My Shepherd Vocal</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Offertory Procession */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Offertory Procession</h3>
          {sections.offertoryProcession && (
            renderVocalItems('offertoryProcession', vocalSections.offertoryProcession)
          )}
        </div>

        {/* Holy Holy */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Holy Holy</h3>
          {sections.holyHoly && (
            renderVocalItems('holyHoly', vocalSections.holyHoly)
          )}
        </div>

        {/* Memorial Acclamation */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Memorial Acclamation</h3>
          {sections.memorialAcclamation && (
            renderVocalItems('memorialAcclamation', vocalSections.memorialAcclamation)
          )}
        </div>

        {/* The great amen */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">The great amen</h3>
          {sections.greatAmen && (
            renderVocalItems('greatAmen', vocalSections.greatAmen)
          )}
        </div>

        {/* Lamb of God */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Lamb of God</h3>
          {sections.lambOfGod && (
            <Select>
              <SelectTrigger className="w-full text-sm bg-[#E7E7E7] dark:bg-gray-700 dark:text-gray-200">
                <SelectValue placeholder="Communion 1" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
                <SelectItem value="communion1" className="dark:text-gray-200">Communion 1</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Filler music post communion */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Filler music post communion</h3>
          <Select>
            <SelectTrigger className="w-full text-sm bg-[#E7E7E7] dark:bg-gray-700 dark:text-gray-200">
              <SelectValue placeholder="Instrumental" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
              <SelectItem value="instrumental" className="dark:text-gray-200">Instrumental</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Final Commendation */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Final Commendation</h3>
          <Select>
            <SelectTrigger className="w-full text-sm bg-[#E7E7E7] dark:bg-gray-700 dark:text-gray-200">
              <SelectValue placeholder="Jesus remember me vocal (mass part)" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-gray-200">
              <SelectItem value="jesus" className="dark:text-gray-200">Jesus remember me vocal (mass part)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recessional */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Recessional</h3>
          {sections.recessional && (
            renderVocalItems('recessional', vocalSections.recessional)
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

          <div className="flex items-center gap-2">
            <Checkbox
              checked={additionalOptions.placingOfSymbols}
              onCheckedChange={(checked) => setAdditionalOptions(prev => ({ ...prev, placingOfSymbols: checked as boolean }))}
              className="rounded-sm"
            />
            <span className="text-sm text-gray-800 dark:text-gray-200">Placing of Symbols: Vocal</span>
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
