import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps, TouchableOpacity } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { LucideIcon, Eye, EyeOff } from 'lucide-react-native'; 

interface ControlledInputProps extends TextInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  icon?: LucideIcon;
}

const ControlledInput = ({
  control,
  name,
  label,
  icon: Icon,
  secureTextEntry,
  ...textInputProps
}: ControlledInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="w-full mb-4">
          {label && <Text className="mb-1 text-sm text-text-main font-sans">{label}</Text>}
          
          {/* Main container with icon and input */}
          <View
            className={`
              flex-row items-center h-14 bg-card rounded-lg border px-4
              ${error ? 'border-error' : 'border-card'}
            `}>
            {Icon && <Icon size={20} color="#9CA3AF" />}
            <TextInput
              className="flex-1 h-full text-base font-sans text-text-main leading-5 ml-2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              {...textInputProps}
            />
            {secureTextEntry && (
              <TouchableOpacity onPress={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <EyeOff size={20} color="#9CA3AF" />
                ) : (
                  <Eye size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            )}
          </View>
          {error && <Text className="mt-1 text-xs text-error font-sans">{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default ControlledInput;