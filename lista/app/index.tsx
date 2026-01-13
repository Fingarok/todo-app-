import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'expo-checkbox';
import { Stack } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ToDoType={
  id:number;
  title: string;
  isDone:boolean;
}

export default function Index() {
  

   const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: true,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: false,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];
     const [todos,setTodos] = useState<ToDoType[]>([]);
     const [todoText,setTodoText] = useState<string>('');

    useEffect(() =>{
      const getTodos = async() =>{
        try{
          const todos = await AsyncStorage.getItem('my-todo');
          if (todos !==null){
            setTodos(JSON.parse(todos));
          }
        }catch (erro){
          console.log(erro);
        }
      };
      getTodos();
    },[]);

     const addTodo = async () => {
        try{
            const newTodo = {
              id:Math.random(),
              title:todoText,
              isDone:false,
            };
            todos.push(newTodo);
            setTodos(todos);
            await AsyncStorage.setItem('my-todo',JSON.stringify(todos));
            setTodoText('');
            Keyboard.dismiss();
          }catch (error){
            console.log(error);
          }

     };
     const deleteTodo = async(id:number) =>{
      try{
        const newTodos = todos.filter((todo) => todo.id !==id);
        await AsyncStorage.setItem('my-todo',JSON.stringify(newTodos));
        setTodos(newTodos);
      }catch (erro){
        console.log(erro);
      }
     }

  <Stack.Screen options ={{title:'Lista'}}/>
  return (
    <SafeAreaView
      style={style.container}
    >
      <View style={style.header}>

        <TouchableOpacity onPress={() => {alert('Clicado')}}>
          <Ionicons name = "menu" size={24} color={'#333'}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}></TouchableOpacity>

      
      </View>

      <View 
        style={style.searchBar}>
        <Ionicons name="search" 
                  size={24} 
                  color={'#333'}/>
          <TextInput  placeholder= "Buscar"
                      style={style.searchInput} 
                      clearButtonMode="always"/>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item)=>item.id.toString()} 
        renderItem={({item}) =>(    
          <ToDoItem todo={item} deleteTodo={deleteTodo}/>
      )}
      />
        
        <KeyboardAvoidingView 
          style={style.footer}
          behavior='padding'>

          <TextInput 
            placeholder= 'Nova tarefa'
            value={todoText}
            onChangeText={(text)=> setTodoText (text)}
            style= {style.newTodoInput}
            autoCorrect={false}/>
          <TouchableOpacity 
            style={style.addButton} 
            onPress={()=>addTodo ()}>
            <Ionicons 
              name='add' 
              size={24} 
              color={'#333'}/>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ToDoItem = ({todo,deleteTodo}:{todo:ToDoType, deleteTodo:(id:number)=> void}) =>(
      <View style={style.todoContainer}>
          <View style={style.todoInfoContainer}>
            <Checkbox value={todo.isDone} 
                      color={todo.isDone ?'#7e0793ff': undefined}/>
            <Text style={[style.todoText,
              todo.isDone && {textDecorationLine:'line-through'}]}
              >
                {todo.title}</Text>
          </View>
          <TouchableOpacity
           onPress={() => {
            deleteTodo(todo.id);
            alert('apagado'+todo.id)}}>
            <Ionicons name="trash" size={24} color={"red"}/>
          </TouchableOpacity>

        </View>
); 

const style = StyleSheet.create({
      container:{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
      },
      header:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom:20,
      },
      searchBar:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#fff',
        padding: 2,
        borderRadius: 10,
        gap:10,
        marginBottom:20,
      },
      searchInput:{
        flex:1,
        fontSize:16,
        color:'#333',
      },
      todoContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor:'#594dcbff',
        padding:16,
        borderRadius: 10,
        marginBottom:20,
      },
      todoInfoContainer:{
        flexDirection: 'row',
        gap:10,
        alignItems:'center',
      },
      todoText:{
        fontSize:16,
        color:'#080707ff',
      },
      footer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',

      },
      newTodoInput:{
        flex:1,
        backgroundColor:"#fff",
        padding:16,
        borderRadius:10,
        fontSize:16,
        color: "#333"
      },
      addButton:{
        backgroundColor:"#7e0793ff",
        padding:14,
        borderRadius:10,
        marginLeft:20

      }
}); 