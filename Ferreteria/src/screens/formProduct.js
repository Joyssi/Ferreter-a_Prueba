    import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native'
    import React from 'react'
    import { useState } from 'react';
    import { collection, addDoc, getFirestore } from "firebase/firestore"; 
    import * as ImagePicker from 'expo-image-picker';
    import {appFirebase} from '../../DataBase/firebaseConfig.js';
    import {firebase} from '../../DataBase/firebaseConfig.js';
    import uuid from 'react-native-uuid';
    
    
    export default function FormProductProduct() {
    
        const db = getFirestore(appFirebase)
        //Conexión con la base de datos
    
        const [product, setProducts] = useState({
            productName: "",
            description: "",
            brand: "",
            stockQuantity: 0,
            price: 0,
            imageUrl: null,
            });
    
            const establecerEstado=(name, value)=>{
            setProducts({...product, [name]:value})
    
            }
            const [image, setImage] = useState(null);
            const [uploading, setUploading] = useState(false);
        
        //Función que permite elegir una imagen de la galería
        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            });
        
            if (!result.canceled) {
            setImage(result.assets[0].uri);
            };
            console.log(image);
        // Establecer Estado("imageUrl",url);
        };
        
        const uploadImage = async () => {
            if (!product.productName||!product.description || !product.brand 
            ||!product.stockQuantity || !product.price || image===null){
            Alert.alert("Alerta","Debe completar todos los campos");
            } else{
            const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
            })
            const uniqueId = uuid.v4(); 
            const ref = firebase.storage().ref().child(`Pictures/Image${uniqueId}`)
            const snapshot = ref.put(blob)
            snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
            ()=>{
                setUploading(true)
            },
            (error) => {
                setUploading(false)
                console.log(error)
                blob.close()
                return 
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                setUploading(false)
                console.log("Download URL: ", url)
                setImage(url)
                establecerEstado("imageUrl",url)
                blob.close()
                validarDatos();
                console.log(url)
                return url  
                })
            }
            )
            }
        }
    
    validarDatos=()=>{
        guardarProducto(product);
        setProducts({
            productName: "",
            descripcion: "",
            brand: "",
            stockQuantity: 0,
            price: 0,
            imageUrl: "C:\Users\rodri\OneDrive\Escritorio",
        });
        setImage(null);
        Alert.alert('Alert', 'Producto registrado');
        }
    
        const guardarProducto = async(product) => {
        try {
            const docRef = await addDoc(collection(db, "colecProductos"), product);
            console.log("Document written with ID: ", docRef.id);
            } catch (e) {
            console.error("Error adding document: ", e);
            }
        };
    
        return (
        
            <ScrollView style={styles.container}>
            
            <Text style={styles.titulo}>Nuevo Producto</Text>
    
            {/* Campo Nombre */}
            <Text>Nombre del producto:</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="Ingrese el nombre"
            value={product.productName}
            onChangeText={(value)=>establecerEstado("productName",value)}
            />

             {/* Campo Descripción */}
            <Text>Descripción del producto:</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="Ingrese la descripción"
            value={product.description}
            onChangeText={(value)=>establecerEstado("description",value)}
            />
    
            {/* Campo Marca */}
            <Text>Marca:</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="Ingrese la marca"
            value={product.brand}
            onChangeText={(value)=>establecerEstado("brand",value)}
            />
    
            {/* Campo Precio */}
            <Text>Precio:</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="Ingrese el precio"
            value={product.price}
            onChangeText={(value)=>establecerEstado("price", value)}
            keyboardType="numeric" // Para que el teclado numérico aparezca
            />
            
            {/* Campo Cantidad */}
            <Text>Cantidad en stock:</Text>
            <TextInput
            style={styles.TextInput}
            placeholder="Ingrese la cantidad"
            value={product.stockQuantity}
            onChangeText={(value)=>establecerEstado("stockQuantity", value)}
            keyboardType="numeric" // Para que el teclado numérico aparezca
            />
        
            {/* Botón para seleccionar imagen */}
            <Button title="Seleccionar Imagen" onPress={pickImage} />
            {image && (
            <Image source={{ uri: image }} style={styles.image} />
            )}
            {/* {!uploading ? <Button title='Upload Image' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}*/}
    
            {/* Botón para enviar el formulario */}
            <View style={{ marginBottom: 15, paddingVertical:7 }}>
            {/* <Button title="Enviar" onPress={uploadImage} />*/}
            {!uploading ? <Button title="Enviar" onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
            </View>
        </ScrollView>
        );
    }
    
    const styles = StyleSheet.create({
        container: {
        padding:10,
        },
    
        image: {
        width: 200,
        height: 200,
        margin:5,
        },
        TextInput:{
        borderColor: 'gray', 
        borderWidth: 1, 
        width:'100%',
        padding: 10, 
        marginBottom: 15 
        },
        titulo:{
        fontSize: 18, 
        marginBottom: 10,
        alignSelf:'center'
        }
    });