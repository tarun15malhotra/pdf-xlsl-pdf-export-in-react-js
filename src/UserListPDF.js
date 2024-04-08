// UserListPDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  userContainer: {
    marginBottom: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
});

const UserListPDF = ({ users }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>User List</Text>
        {users.map((user, index) => (
          <View key={index} style={styles.userContainer}>
            <Text style={styles.userName}>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Phone: {user.phone}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default UserListPDF;
