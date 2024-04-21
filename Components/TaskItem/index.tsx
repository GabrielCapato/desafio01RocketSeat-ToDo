import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

// import { Container } from './styles';

type Props = {
  description: string
  done: boolean
  updateTaskStatus: () => void
  handleRemoveTask: () => void
}

export default function TaskItem({description, done = false,updateTaskStatus,handleRemoveTask }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={updateTaskStatus}>
      {done ? (
        <Image source={require('./icons/checked.png')} />
      ) : (<Image source={require('./icons/check.png')} />)}
      <View style={styles.descriptionView}>
        <Text style={!done ? styles.text : styles.textDone}>{description}</Text>
      </View>
      <TouchableOpacity onPress={handleRemoveTask}>
        <Image source={require('./icons/trash.png')} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
