import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState(''); 
  const [taskList, setTaskList] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira uma tarefa válida!');
      return;
    }

    setTaskList([...taskList, task]); 
    setTask(''); 
  };


  const confirmRemoveTask = (index) => {
    setSelectedTaskIndex(index); 
    setIsModalVisible(true); 
  };

  const removeTask = () => {
    const updatedList = taskList.filter((_, i) => i !== selectedTaskIndex); 
    setTaskList(updatedList);
    setIsModalVisible(false); 
  };

  const cancelRemoveTask = () => {
    setSelectedTaskIndex(null);
    setIsModalVisible(false); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      {/* Campo de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova tarefa..."
        value={task}
        onChangeText={(text) => setTask(text)}
      />

      {/* Botão de Adicionar */}
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      {/* Lista de tarefas */}
      <FlatList
        data={taskList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => confirmRemoveTask(index)}
            style={styles.taskItem}>
            <Text style={styles.taskText}>{item}</Text>
            <Text style={styles.removeText}>Clique para remover</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal de confirmação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={cancelRemoveTask}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Deseja realmente remover esta tarefa?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={removeTask}>
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelRemoveTask}>
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
    flexWrap: 'wrap',
    maxWidth: '80%', 
  },
  removeText: {
    color: 'red',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
