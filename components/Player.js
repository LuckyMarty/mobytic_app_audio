import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import mp3 from "../assets/test.mp3"

export default function Player() {
  const [sound, setSound] = useState();

  async function replaySound() {
    console.log('Unloading Sound');
    await sound.unloadAsync();
    setSound(null)
    playSound();
  }

  async function playSound() {

    if (!sound) {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(mp3);
      // console.log(sound);
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    } else {
      await sound.playAsync();
    }
  }

  async function pauseSound() {

    if (sound) {
      console.log('Pause Sound');
      await sound.pauseAsync();
    }
  }

  useEffect(() => {
    // return sound
    //   ? () => {
    //       console.log('Unloading Sound');
    //       sound.unloadAsync();
    //     }
    //   : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      {/* <Button title="Replay Sound" onPress={replaySound} /> */}
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Pause Sound" onPress={pauseSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
