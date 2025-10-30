
import React from 'react';
import { SectionList, Text, View, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import dados from './data/dados'


export default function App() {


  const { width, height } = useWindowDimensions()


  const [lista, setLista] = React.useState(() => dados)
  const [filtro, setFiltro] = React.useState('')


  const handleFilter = React.useCallback((text) => {
    setFiltro(text)
    if (!text) {
      setLista(dados)
      return
    }
    const q = text.toLowerCase()
    const filtered = dados
      .map(section => {
        const data = section.data.filter(item =>
          item.nome.toLowerCase().includes(q)
        )
        return { ...section, data }
      })
      .filter(section => section.data.length > 0)


    setLista(filtered)
  }, [setFiltro, setLista])


  const renderItem = React.useCallback(({ item }) => (
    <Text style={styles.item}>
      {item.nome} ({item.preco.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })})
    </Text>
  ), [])


  const renderSectionHeader = React.useCallback(({ section }) => (
    <Text style={styles.header}>{section.categoria}</Text>
  ), [])


  const keyExtractor = React.useCallback((item) => item.id.toString(), [])


  const containerStyle = React.useMemo(() => {
    const isWide = width >= 600
    return [
      styles.container,
      {
        paddingHorizontal: isWide ? 24 : 12,
        paddingTop: isWide ? 20 : 12,
      }
    ]
  }, [width])


  return (
    <View style={containerStyle}>
      <View style={styles.filter}>
        <Text style={styles.label}>Filtrar:</Text>
        <TextInput
          style={styles.textInput}
          value={filtro}
          onChangeText={handleFilter}
        />
      </View>
      <SectionList
        sections={lista}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  filter: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    padding: 15,
    height: 64
  },
  label: {
    marginBottom: 8,
    marginTop: 8,
    marginRight: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 8,
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  header: {
    fontSize: 20,
    backgroundColor: '#eee',
    padding: 8,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
  },
});
