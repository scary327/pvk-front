import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import * as Select from '@radix-ui/react-select';

type CustomSelectProps = {
  value: string | number | null;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  placeholder: string;
};

export const CustomSelect = ({ value, onChange, options, placeholder }: CustomSelectProps) => {
  return (
    <Select.Root value={value?.toString() || ''} onValueChange={onChange}>
      <Select.Trigger
        className="inline-flex items-center justify-between rounded-md py-2 text-sm leading-none h-10 gap-2 bg-white text-gray-900 focus:ring-2 focus:ring-[#636ae8] focus:ring-offset-2 data-[placeholder]:text-gray-500"
        aria-label={placeholder}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <div>
          <Select.Content
            className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200"
            position="popper"
            sideOffset={5}
          >
            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
              <ChevronUp className="h-4 w-4" />
            </Select.ScrollUpButton>

            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value.toString()}
                  className="relative flex items-center px-8 py-2 text-sm text-gray-900 rounded-md cursor-default select-none data-[highlighted]:bg-[#636ae8]/10 data-[highlighted]:outline-none data-[state=checked]:bg-[#636ae8]/10"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check className="h-4 w-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
              <ChevronDown className="h-4 w-4" />
            </Select.ScrollDownButton>
          </Select.Content>
        </div>
      </Select.Portal>
    </Select.Root>
  );
}; 