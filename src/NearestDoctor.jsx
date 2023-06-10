import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { styles } from './NearestDoctorStyles';
import NetInfo from '@react-native-community/netinfo';
import { DoctorsData } from '../data/doctorsData';
import { myFunction } from './DistanceCalculation';

let userLat = 0.0
let userLon = 0.0
let userDoctorDistance = []

const fetchAddressFromPincode = async (pincode, setAddress) => {
  // console.log('in fetch function')
  try {
    // console.log('fetching data...')
    // Fetch latitude and longitude for the pincode
    const geocodeResponse = await axios.get(
      `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&format=json&limit=1`
    );

    // assign lat and lon of user pincode for calculation purpose
    geocodeResponse.data.length > 0 ? (userLat = Number(geocodeResponse.data[0].lat),
      userLon = Number(geocodeResponse.data[0].lon)) : ''

    // console.log(userLat, 'user lat')


    if (geocodeResponse.data.length > 0) {
      const { lat, lon } = geocodeResponse.data[0];
      // console.log('above to reverse engg')
      // Reverse geocoding to fetch address
      const reverseGeocodeResponse = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      // console.log('under reverse engg')

      const { display_name } = reverseGeocodeResponse.data;
      setAddress([display_name]);
    } else {
      setAddress('No results found for the pincode');
      // console.log('inelse')
    }
  } catch (error) {
    console.error('Error retrieving address:', error);
  }
};

const NearestDoctor = () => {

  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  const handlePincodeChange = (value) => {
    setPincode(value);
  };

  const handleFetchAddress = async () => {
    // console.log('hai')
    // console.log('hai2')
    await fetchAddressFromPincode(pincode, setAddress);
    // console.log('fun completed')

  };

  // to chech the internet connectivity
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // for doctor data
  const [doctorsData, setDoctorsData] = useState([]);
  // setTimeout(()=>(console.log(doctorsData)),1000)
  useEffect(() => {
    fetchDoctorsData();
  }, []);
  const fetchDoctorsData = async () => {
    try {
      setDoctorsData(DoctorsData);
    } catch (error) {
      console.error('Error fetching doctors data:', error);
    }
  };
  // to fetch distance
  const fetchDistance = (doctor) => {
    handleFetchAddress()
    userDoctorDistance = []
    console.log(userLat)
    if (userLat) {
      // console.log('rendring why dont know')
      for (i in doctor) {
        // console.log(i)
        if (i == 0) {
          console.log(Number(doctor[i].lat))
          console.log(Number(doctor[i].lon))
          console.log(userLat.toFixed(4))
          console.log(userLon.toFixed(4))
        }

        let distance = myFunction(userLat.toFixed(4), userLon.toFixed(4), Number(doctor[i].lat), Number(doctor[i].lon))
        userDoctorDistance.push([doctor[i].id, distance])
        // console.log()
      }
      console.log('rendring why dont know')
      // console.log(doctor[0])
      console.log(userDoctorDistance)
      // console.log(myFunction(userLat, userLon, doctor.lat, doctor.lon)) 
    }
    else {
      console.log("areey yar..! enter pincode bhai")
    }
  }
  //  rendering data 
  const renderDoctorData = ({ item }) => (
    // <TouchableOpacity onPress={() => fetchDistance(item)}>
    <View>
      <Text >{item.doctorName}</Text>
    </View>
    // </TouchableOpacity>

  )

  const handleButtonPress = () => {
    console.log('Button pressed!');
    // Call your desired function here
    // Example: myFunction();
  };


  return (
    <View style={styles.container}>
      <Text>NearestDoctor</Text>
      <Text>Internet Connection: {isConnected ? 'Connected' : 'Disconnected'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={handlePincodeChange}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.fetchButton} onPress={handleFetchAddress}>
        <Text style={styles.buttonText}>Fetch Address</Text>
      </TouchableOpacity>
      <Button title='search' onPress={handleButtonPress} />
      <Button title="Click Me" onPress={() => fetchDistance(DoctorsData)} />
      {address !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText} >Address:</Text>
          <Text style={styles.resultText} >{address}</Text>
        </View>
      )}

      <FlatList
        data={doctorsData}
        renderItem={renderDoctorData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.doctorDataContainer}
      />
      <Text>END</Text>
    </View>
  );
};

export default NearestDoctor;
