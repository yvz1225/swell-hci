import React from 'react';
import { HermitCrabIcon } from '../assets/HermitCrabIcon';
import { Style, Season } from '../types';

interface HeaderProps {
    filters: { style: 'all' | Style, season: 'all' | Season };
    onFilterChange: (type: 'style' | 'season', value: 'all' | Style | Season) => void;
    onRefresh: () => void;
}

const FilterDropdown: React.FC<{
    label: string,
    value: string,
    options: string[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}> = ({ label, value, options, onChange }) => (
    <div className="relative">
        <select
            value={value}
            onChange={onChange}
            className="appearance-none bg-shell-bg border border-sand-medium/30 rounded-md py-1 pl-3 pr-8 text-sm text-sand-dark focus:outline-none focus:ring-1 focus:ring-seafoam"
        >
            <option value="all">{label}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        <svg className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none text-sand-medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </div>
);


const Header: React.FC<HeaderProps> = ({ filters, onFilterChange, onRefresh }) => {
  return (
    <header className="w-full p-4 flex items-center justify-between border-b border-sand-medium/20 flex-shrink-0">
        <div className="flex items-center gap-2">
            <HermitCrabIcon className="w-8 h-8 text-ocean-deep"/>
            <h1 className="text-xl font-bold text-ocean-deep hidden sm:block">swell</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
            <FilterDropdown 
                label="계절"
                value={filters.season}
                options={['봄', '여름', '가을', '겨울']}
                onChange={(e) => onFilterChange('season', e.target.value as 'all' | Season)}
            />
             <FilterDropdown 
                label="스타일"
                value={filters.style}
                options={['캐주얼', '스트릿', '포멀', '스포티']}
                onChange={(e) => onFilterChange('style', e.target.value as 'all' | Style)}
            />
            <button onClick={onRefresh} className="p-2 text-sand-medium hover:text-ocean-deep" aria-label="Refresh outfits">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg>
            </button>
        </div>
    </header>
  );
};

export default Header;