import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
  },
  total: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
});

// Quote PDF Document component
const QuotePDF = ({ quoteData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Procushion Auto Paint</Text>
        <Text>Quotation #{quoteData.quoteNumber}</Text>
        <Text>Date: {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Customer Details</Text>
        <View style={styles.row}>
          <Text>Name:</Text>
          <Text>{quoteData.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text>Email:</Text>
          <Text>{quoteData.email}</Text>
        </View>
        <View style={styles.row}>
          <Text>Phone:</Text>
          <Text>{quoteData.phone}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Vehicle Details</Text>
        <View style={styles.row}>
          <Text>Make:</Text>
          <Text>{quoteData.vehicleMake}</Text>
        </View>
        <View style={styles.row}>
          <Text>Model:</Text>
          <Text>{quoteData.vehicleModel}</Text>
        </View>
        <View style={styles.row}>
          <Text>Year:</Text>
          <Text>{quoteData.vehicleYear}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Paint Service Details</Text>
        <View style={styles.row}>
          <Text>Paint Type:</Text>
          <Text>{quoteData.paintType}</Text>
        </View>
        
        <Text style={styles.label}>Areas to Paint:</Text>
        {quoteData.paintAreas.map((area, index) => (
          <View key={index} style={styles.row}>
            <Text>{area.label}</Text>
            <Text>R{area.price.toLocaleString()}</Text>
          </View>
        ))}

        <Text style={styles.label}>Additional Services:</Text>
        {quoteData.additionalServices.map((service, index) => (
          <View key={index} style={styles.row}>
            <Text>{service.label}</Text>
            <Text>R{service.price.toLocaleString()}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.total}>
          <Text>Total Estimated Cost: R{quoteData.totalCost.toLocaleString()}</Text>
        </View>
        <Text>Estimated Time to Complete: {quoteData.estimatedTime} days</Text>
      </View>

      <View style={styles.footer}>
        <Text>This quote is valid for 14 days from the date of issue.</Text>
        <Text>Procushion Auto Paint</Text>
        <Text>Sekwereng (Phuthadijhba Freedom Square Shopping Centre)</Text>
        <Text>Phone: 083 579 6982 | Email: info@procushion.co.za</Text>
      </View>
    </Page>
  </Document>
);

// Quote Generator Component
const QuoteGenerator = ({ quoteData }) => {
  const fileName = `quote-${quoteData.quoteNumber}.pdf`;

  return (
    <div className="quote-generator">
      <PDFDownloadLink
        document={<QuotePDF quoteData={quoteData} />}
        fileName={fileName}
        className="download-button"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generating quote...' : 'Download Quote PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default QuoteGenerator;
