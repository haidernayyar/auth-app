import React from 'react';
import { View, Text, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupData } from '../../utils/validationSchemas';
import ControlledInput from '../../components/form/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Lock, Mail } from 'lucide-react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen = ({ navigation }: any) => { 
  const { signup, isLoading } = useAuth();
  const { control, handleSubmit } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    try {
      const { name, email, password } = data;
      await signup({ name, email, password });
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 p-container">
        <TouchableOpacity onPress={() => navigation.goBack()} className="py-2">
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        
        <View className="flex-1 pt-6">
          <Text className="text-3xl font-sans-bold text-text-main mb-2">Create your account</Text>
          <Text className="text-base font-sans text-text-subtle mb-8">
            Get started with your music journey.
          </Text>

          <View className="w-full space-y-4">
          <ControlledInput
              control={control}
              name="email"
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              icon={Mail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <ControlledInput
              control={control}
              name="password"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              icon={Lock} 
              secureTextEntry
            />
            <ControlledInput
              control={control}
              name="confirmPassword"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              icon={Lock} 
              secureTextEntry
            />
            
            <View className="mt-6">
              <Button
                title="Sign Up"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
                intent="primary"
                className="text-logCabin"
              />
            </View>
          </View>

          <Text className="text-xs text-text-subtle text-center mt-8 px-4">
            By signing up, you agree to our{' '}
            <Text className="text-primary font-sans-bold">Terms, Privacy Policy</Text>
          </Text>

          <View className="flex-row justify-center mt-auto pb-4">
            <Text className="text-text-main font-sans">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-primary font-sans-bold">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;