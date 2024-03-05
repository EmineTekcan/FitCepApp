import { StyleSheet, Text, View,TouchableOpacity, ScrollView  } from 'react-native'
import React ,{ useState } from 'react'
import {LineChart} from 'react-native-chart-kit'
//import FusionCharts from "react-native-fusioncharts";
import { PieChart } from "react-native-gifted-charts";
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";


const ProgressScreen = () => {

  const navigation = useNavigation();

  const [selectedExercise, setSelectedExercise] = useState(null);
  const dataItem = {
    labels: ['Koşu', 'Yoga', 'Boks'],
    datasets: [
      {
        data: [40, 45, 20], // Bu verileri gerçek verilerle değiştirilecek
      },
    ],
  };
  const exercises = [
    { id: 1, name: 'Koşu' },
    { id: 2, name: 'Yoga' },
    { id: 3, name: 'Boks' },
  ];

  

  const handleExercisePress = (exercise) => {
    setSelectedExercise(exercise);
  };
 

  const pieData = [
        {value: 54, color: '#177AD5', text: '54%'},
        {value: 40, color: '#79D2DE', text: '30%'},
        {value: 20, color: '#ED6665', text: '26%'},
    ];



  return (
    <ScrollView style={{ flex: 1, padding: 15 }}>
      {/* Üst kısım */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={{
              backgroundColor: selectedExercise === exercise ? '#3498db' : '#ecf0f1',
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => handleExercisePress(exercise)}
          >
            <Text style={{ color: selectedExercise === exercise ? '#fff' : '#2c3e50' }}>
              {exercise.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orta kısım */}
       <View style={{ flexDirection: 'row', 
       backgroundColor: '#ff7f00',borderRadius: 16,justifyContent: 'center',alignItems: 'center'}} >
            <PieChart
            donut
            isThreeD
            showText
            textColor="black"
            radius={150}
            textSize={20}
            showTextBackground
            textBackgroundRadius={26}
            data={pieData}
            />
    </View>
             
       
      {/* Alt kısım */}
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Egzersiz Grafiği</Text>
        <LineChart
          data={dataItem}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      {/* Yeni eklenen alan */}
            <View className="flex flex-row items-center justify-between px-2 bg-white-500 mt-8">
  <View className="flex flex-row gap-2 items-center">
    <View className="flex flex-col">
      <Text className="text-black text-base font-semibold">Sıradaki Egzersiz</Text>
      <Text className="text-blue-700 text">Yoga</Text>
    </View>
  </View>
  <AntDesign onPress={() => navigation.navigate("ToDoScreen")} name="plus" size={24} color="black" />
  </View>
      
    </ScrollView>
  );
};


export default ProgressScreen

const styles = StyleSheet.create({
  chartContainer: {
    height: 150
  },
  
})

