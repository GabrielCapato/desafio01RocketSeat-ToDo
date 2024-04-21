import React, { useState } from 'react';
import { Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import TaskItem from '../../../Components/TaskItem';

// import { Container } from './styles';

export default function Home() {

  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState('')

  function updateTaskStatus(taskId) {
    let taskToUpdateIndex = tasks.findIndex(task => task.id === taskId)
    const updatedTasks = [...tasks];

    updatedTasks[taskToUpdateIndex] = {
      ...updatedTasks[taskToUpdateIndex],
      done: !updatedTasks[taskToUpdateIndex].done
    };
    return setTasks(updatedTasks)

  }

  function handleAddNewTask() {
    if (taskName === '') {
      return Alert.alert('Atenção', "Escreva o nome da tarefa que deseja adicionar")
    }

    if (tasks.some(task => task.description === taskName)) {
      return Alert.alert('Atenção', "Já existe uma atividade com este nome adicionada !")
    }

    setTasks(prevState => [...prevState, { id: (Math.random() * 10), description: taskName, done: false }])
    setTaskName('')
  }

  function handleRemoveTask(taskId, description) {
    Alert.alert('Atenção', `Deseja remover a tarefa: ${description}`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => {
          const tasksDontMatchId = tasks.filter(task => task.id !== taskId)
          setTasks(tasksDontMatchId)
        }
      }
    ])

  }


  return (
    <View style={styles.container} >
      <Image source={require('./logo/Logo.png')} style={styles.image} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder='Adicione uma nova tarefa'
          placeholderTextColor='#808080'
          onChangeText={setTaskName}
          value={taskName}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddNewTask}>
          <Image source={require('./icons/plus.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.filter}>
          <Text style={styles.created}>Criadas</Text>
          <View style={styles.borderCounter}>
            <Text style={styles.counter}>{(tasks.filter(task => task.done === false)).length}</Text>
          </View>
        </View>
        <View style={styles.filter}>
          <Text style={styles.done}>Concluídas</Text>
          <View style={styles.borderCounter}>
            <Text style={styles.counter}>{(tasks.filter(task => task.done === true)).length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TaskItem
            description={item.description}
            done={item.done}
            updateTaskStatus={() => updateTaskStatus(item.id)}
            handleRemoveTask={() => handleRemoveTask(item.id, item.description)}
          />)}
        ListEmptyComponent={() => (

          <View style={styles.emptyView}>
            <Image style={styles.imageClip} source={require('./icons/Clipboard.png')} />
            <Text style={styles.emptyViewTitle}>Você ainda não tem tarefas cadastradas</Text>
            <Text style={styles.emptyViewText}>Crie tarefas e organize seus itens a fazer</Text>
          </View>
        )

        }
      />
    </View>
  );
}
