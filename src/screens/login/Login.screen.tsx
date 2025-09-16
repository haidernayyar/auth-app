import React from 'react';
import { View, Text, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginData } from '../../utils/validationSchemas';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import ControlledInput from '../../components/form/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, Mail } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const { login, isLoading } = useAuth();
  const { control, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 p-container">
        <View className="flex-1 justify-center">

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
            
            <TouchableOpacity className="self-end">
              <Text className="text-text-subtle font-sans">Forgot password?</Text>
            </TouchableOpacity>
            
            <View className="pt-4">
              <Button
                title="Sign In"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
                intent="primary"
                className="text-logCabin"
              />
            </View>
          </View>
        </View>

        <View className="flex-row justify-center items-center mt-auto pb-4">
          <Text className="text-text-main font-sans">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-primary font-sans-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;