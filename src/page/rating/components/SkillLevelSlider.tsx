import * as Slider from '@radix-ui/react-slider';

type SkillLevelSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export const SkillLevelSlider = ({ value, onChange }: SkillLevelSliderProps) => {
  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      value={[value]}
      max={100}
      step={1}
      onValueChange={([newValue]) => onChange(newValue)}
    >
      <Slider.Track className="bg-gray-200 relative grow rounded-full h-1.5">
        <Slider.Range className="absolute bg-[#636ae8] rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb
        className="block w-4 h-4 bg-white border-2 border-[#636ae8] rounded-full hover:bg-[#636ae8]/10 focus:outline-none focus:ring-2 focus:ring-[#636ae8] focus:ring-offset-2"
        aria-label="Skill level"
      />
    </Slider.Root>
  );
}; 