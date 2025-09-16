import React from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const placeholderContent = [
  { id: '1', title: 'Daily Mix 1', artist: 'Made for you', image: 'https://images.unsplash.com/photo-1631786170318-ef467b60ef9a?q=40' },
  { id: '2', title: 'Lo-fi Beats', artist: 'Playlist', image: 'https://images.unsplash.com/photo-1634242795248-4b45073ee336?q=40' },
  { id: '3', title: 'Chill Vibes', artist: 'Playlist', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=40' },
  { id: '4', title: 'Top Hits', artist: 'Chart', image: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?q=40' },
];

const HomeScreen = () => {
  const { user, logout } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View className="p-container">
          
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-2xl font-sans-bold text-text-main">
                {getGreeting()}
              </Text>
              <Text className="text-lg font-sans text-text-subtle">
                {user?.email}
              </Text>
            </View>
            <TouchableOpacity onPress={logout}>
              <LogOut size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Recently Played Section */}
          <View>
            <Text className="text-xl font-sans-bold text-text-main mb-4">Recently Played</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-4">
                {placeholderContent.map((item) => (
                  <TouchableOpacity key={item.id} className="w-36 mx-2">
                    <Image source={{ uri: item.image }} className="w-36 h-36 rounded-lg" />
                    <Text className="text-text-main font-sans-bold mt-2 truncate">{item.title}</Text>
                    <Text className="text-text-subtle font-sans text-xs">{item.artist}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          
          {/* Made for You Section */}
          <View className="mt-8">
            <Text className="text-xl font-sans-bold text-text-main mb-4">Made for You</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-4">
                {placeholderContent.reverse().map((item) => (
                  <TouchableOpacity key={item.id} className="w-36 mx-2">
                    <Image source={{ uri: item.image }} className="w-36 h-36 rounded-lg" />
                    <Text className="text-text-main font-sans-bold mt-2 truncate">{item.title}</Text>
                    <Text className="text-text-subtle font-sans text-xs">{item.artist}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;