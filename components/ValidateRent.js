import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import {Calendar} from 'react-native-calendars';

import { Ionicons } from '@expo/vector-icons'; 

const ValidateRent = ({navigation, id, visibility, setVisibility, availability, user, ownerId, ownerName }) => {
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);

    const [dateInterval, setDateInterval] = useState({});

    const [datesTaken, setDatesTaken] = useState(availability);

    const addDate = (date, datesTaken) => {
        let newDatesTaken = {...datesTaken, [date]: 'wanted'};
        let update = true;

        const dates = Object.entries(newDatesTaken).filter((item) => item[1] === 'wanted').sort((a, b) => a[0].localeCompare(b[0]))

        if(dates.length > 5) {
            Alert.alert("Too much days selected", 'You can only select 5 days at most');
            update = false;
        }

        dates.forEach((item, index) => {
            //If previous date is not the day before the current date
            var d1 = Date.parse(item[0]);
            var d2 = Date.parse(dates[index - 1]?.[0]) + 86400000;
            if(index > 0 && d2 !== d1) {
                Alert.alert("Invalid date range", 'You can only select consecutive dates');
                update = false;
            }
        });

        if(update) {
            setDatesTaken(newDatesTaken);
            setDateInterval({startDate: dates[0][0], endDate: dates[dates.length - 1][0]});
        }
    }

    const dateToString = (date) => {
        var day = date.getDate()
        var month = date.getMonth() + 1; //Current Month
        var year = date.getFullYear(); //Current Year
        return year + '-' + month + '-' + day
    }

    const submitRent = () => {
        let newDatesTaken = {... availability}
        for (let start = Date.parse(dateInterval.startDate); start <= Date.parse(dateInterval.endDate); start+=86400000) {
            let date = new Date(start);
            let dateString = dateToString(date);
            newDatesTaken[dateString] = 'taken';          
        }   

        console.log(ownerName);

        user.rentItem(id, newDatesTaken).then(() => {
            user.createChat(id, dateInterval.startDate, dateInterval.endDate).then((idChat) => {
                navigation.navigate('Chat', {contact: {id: ownerId, name: ownerName}, chatId: idChat});
            });
        });
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibility}
            onRequestClose={() => {
                setVisibility(false);
              }}
        >
            <View style={styles.center}>
                <View style={styles.container}>
                    <View style={{width: "90%"}}>
                        <Text style={styles.title}>Choose a date</Text>
                        <TouchableOpacity style={styles.calendarOpen} onPress={() => setCalendarModalVisible(true)}>
                            <Text style={styles.openText}>{dateInterval ? dateInterval.startDate + " | " + dateInterval.endDate : "__ - __ | __ - __"}</Text>
                            <Ionicons name="ios-calendar" size={24} color="#4BAD80" />
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={calendarModalVisible}
                        >
                            <View style={styles.center}>
                                <View style={styles.calendarModal}>
                                    <Calendar
                                        theme={{calendarBackground:'#F6FFFB' }}
                                        onDayPress={day => {
                                            if(!datesTaken || !datesTaken[day.dateString]) {
                                                addDate(day.dateString, datesTaken);
                                            } else {
                                                if(datesTaken[day.dateString] != 'taken') {
                                                    if(datesTaken[day.dateString] === 'wanted') {
                                                        setDatesTaken({...datesTaken, [day.dateString]: ''});
                                                    } else {
                                                        addDate(day.dateString, datesTaken);
                                                    }
                                                }
                                            }
                                          }}
                                        style={styles.calendar}
                                        markingType={'period'}
                                        markedDates={datesTaken && Object.entries(datesTaken).reduce(
                                            (obj, item) => {
                                                if(item[1] === 'taken') {
                                                    return Object.assign(obj, { [item[0]]: {
                                                        textColor: '#CCCCCC',
                                                    }})
                                                } else if (item[1] === 'wanted') {
                                                    return Object.assign(obj, { [item[0]]: {
                                                        color: '#4BAD80',
                                                        textColor: '#FFFFFF',
                                                    }})
                                                } else {
                                                    return obj;
                                                }
                                            }, {})}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setCalendarModalVisible(false)}
                                    >
                                        <Text style={styles.confirmDate}>Save dates</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={{width: "90%"}}>
                        <Text style={styles.title}>Message to the renter</Text>
                        <TextInput
                            style={styles.message}
                            placeholder="Write a little message to the renter to explain your need."
                            multiline={true}
                            numberOfLines={5}
                        />
                    </View>
                    <TouchableOpacity style={styles.confirm} onPress={() => submitRent()} >
                        <Text style={styles.textConfirm}>Reserve the location</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: '85%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F6FFFB',
        elevation: 50,
    },
    calendarOpen: {
        width: '100%',
        height: 50,
        backgroundColor: '#E3F4EA',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    openText: {
        color: '#4BAD80',
    },
    calendarModal: {
        backgroundColor: '#F6FFFB',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 50,
    },
    confirmDate: {
        width: '100%',
        fontSize: 15,
        color: '#4BAD80',
        margin: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left',
        color: '#4BAD80',
        marginBottom: 10,
    },
    message: {
        backgroundColor: '#E3F4EA',
        color: '#4BAD80',
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
    confirm: {
        backgroundColor: '#FF6E6C',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 50,
        elevation: 10,
    },
    textConfirm: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'semibold',
    }
});

export default ValidateRent;