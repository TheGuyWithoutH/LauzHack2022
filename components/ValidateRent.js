import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {Calendar} from 'react-native-calendars';

import { Ionicons } from '@expo/vector-icons'; 

const ValidateRent = ({navigation, id, }) => {
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);

    const [dateInterval, setDateInterval] = useState({});

    const [datesTaken, setDatesTaken] = useState([
        {
            date: '2022-12-10',
            status: 'taken',
        },
        {
            date: '2022-12-11',
            status: 'taken',
        },
        {
            date: '2022-12-12',
            status: 'taken',
        },
        {
            date: '2022-12-13',
            status: 'wanted',
        },
    ]);

    const addDate = (idx, date, datesTaken) => {
        let newDatesTaken = [...datesTaken];

        if(idx < 0) {
            newDatesTaken.push({date: date, status: 'wanted'});
        } else {
            newDatesTaken[idx].status = 'wanted';
        }

        const dates = newDatesTaken.filter((item) => item.status === 'wanted').sort((a, b) => a.date.localeCompare(b.date))

        if(dates.length > 5) {
            alert('You can only select 5 dates');
            return;
        }

        console.log(datesTaken);
        dates.forEach((item, index) => {
            //If previous date is not the day before the current date
            if(index > 0 && new Date(item.date) > new Date((new Date(dates[index - 1].date)).getDate() + 1) ) {
                alert('You can only select 5 consecutive dates');
                return;
            }
        });

        setDatesTaken(newDatesTaken);
        setDateInterval({startDate: dates[0].date, endDate: dates[dates.length - 1].date});
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                setModalVisible(false);
              }}
        >
            <View style={styles.center}>
                <View style={styles.container}>
                    <View style={{width: "90%"}}>
                        <Text style={styles.title}>Choose a date</Text>
                        <TouchableOpacity style={styles.calendarOpen} onPress={() => setCalendarModalVisible(true)}>
                            <Text style={styles.openText}>__ - __ | __ - __</Text>
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
                                            const elem = datesTaken.indexOf({date: day.dateString});
                                            if(elem === -1) {
                                                addDate(-1, day.dateString, datesTaken);
                                            } else {
                                                if(datesTaken[elem].status != 'taken') {
                                                    if(datesTaken[elem].status === 'wanted') {
                                                        setDatesTaken(datesTaken.map(elem => elem.date === day.dateString ? {date: day.dateString, status: ''} : elem));
                                                    } else {
                                                        addDate(elem, day.dateString, datesTaken);
                                                    }
                                                }
                                            }
                                          }}
                                        style={styles.calendar}
                                        markingType={'period'}
                                        markedDates={datesTaken.reduce(
                                            (obj, item) => {
                                                if(item.status === 'taken') {
                                                    return Object.assign(obj, { [item.date]: {
                                                        textColor: '#CCCCCC',
                                                    }})
                                                } else if (item.status === 'wanted') {
                                                    return Object.assign(obj, { [item.date]: {
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
                    <TouchableOpacity style={styles.confirm} >
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