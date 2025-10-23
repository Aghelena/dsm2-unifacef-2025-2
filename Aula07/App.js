import React, { useMemo, useCallback, memo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  Platform,
} from "react-native";

const THEME = {
  bg: "#FAF7F2",
  header: "#F0E6DB",
  surface: "#FFFFFF",
  border: "#E5D8C9",
  text: "#3A2E2A",
  textMuted: "#8C7A70",
  section: "#6E4E37",
  accent: "#9C6B3D",
  badgeBg: "#F3E8DC",
  badgeText: "#5A463C",
};

const PRODUTOS = [
  { id: "1", nome: "Iphone Pro 15", preco: 7599.9, categoria: "Eletrônicos" },
  { id: "2", nome: "Smartphone X", preco: 4299.0, categoria: "Eletrônicos" },
  { id: "3", nome: "Fone Bluetooth", preco: 399.9, categoria: "Eletrônicos" },
  { id: "4", nome: "Camiseta Dry Fit", preco: 79.9, categoria: "Moda" },
  { id: "5", nome: "Jaqueta Corta-Vento", preco: 349.9, categoria: "Moda" },
  { id: "6", nome: "Calça Jeans Slim", preco: 189.9, categoria: "Moda" },
  { id: "7", nome: "Liquidificador Turbo", preco: 239.9, categoria: "Casa & Cozinha" },
  { id: "8", nome: "Aspirador Robô", preco: 1899.9, categoria: "Casa & Cozinha" },
  { id: "9", nome: "Jogo de Panelas", preco: 499.9, categoria: "Casa & Cozinha" },
  { id: "10", nome: "Bola de Basquete", preco: 129.9, categoria: "Esporte" },
  { id: "11", nome: "Bicicleta MTB 29", preco: 2499.0, categoria: "Esporte" },
  { id: "12", nome: "Tênis de Corrida", preco: 549.9, categoria: "Esporte" },
];

const formatBRL = (n) =>
  Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function useResponsiveScale() {
  const { width } = useWindowDimensions();
  const scale = Math.max(0.85, Math.min(1.2, width / 375));
  return (size) => Math.round(size * scale);
}

function useSections(produtos) {
  return useMemo(() => {
    const porCategoria = produtos.reduce((acc, p) => {
      acc[p.categoria] = acc[p.categoria] || [];
      acc[p.categoria].push(p);
      return acc;
    }, {});
    return Object.keys(porCategoria)
      .sort((a, b) => a.localeCompare(b))
      .map((cat) => ({
        title: cat,
        data: porCategoria[cat].sort((a, b) => a.nome.localeCompare(b.nome)),
      }));
  }, [produtos]);
}

const HeaderSection = memo(function HeaderSection({ title }) {
  return (
    <View style={styles.sectionHeaderWrap}>
      <Text style={styles.sectionHeader}>{title}</Text>
    </View>
  );
});

const ItemCard = memo(function ItemCard({ item, s }) {
  return (
    <View style={[styles.card, { padding: s(12), borderRadius: s(12) }]}>
      <Text style={[styles.nome, { fontSize: s(16), marginBottom: s(6) }]}>
        {item.nome}
      </Text>
      <View style={styles.rowBetween}>
        <Text style={[styles.preco, { fontSize: s(14) }]}>{formatBRL(item.preco)}</Text>
        <Text
          style={[
            styles.badge,
            {
              paddingVertical: s(2),
              paddingHorizontal: s(8),
              borderRadius: s(999),
            },
          ]}
        >
          {item.categoria}
        </Text>
      </View>
    </View>
  );
});

export default function App() {
  const s = useResponsiveScale();
  const sections = useSections(PRODUTOS);
  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item }) => <ItemCard item={item} s={s} />,
    [s]
  );
  const renderSectionHeader = useCallback(
    ({ section }) => <HeaderSection title={section.title} />,
    []
  );
  const getItemLayout = useCallback(
    (_data, index) => ({ length: s(88), offset: s(88) * index, index }),
    [s]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
        backgroundColor={THEME.header}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Catálogo Interativo de Produtos</Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
        contentContainerStyle={styles.listContent}
        maxToRenderPerBatch={12}
        initialNumToRender={12}
        windowSize={10}
        getItemLayout={getItemLayout}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  header: {
    backgroundColor: THEME.header,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: THEME.border,
  },
  title: {
    color: THEME.text,
    fontWeight: "700",
    letterSpacing: 0.4,
    fontSize: 18,
  },
  sectionHeaderWrap: {
    backgroundColor: THEME.bg,
    paddingVertical: 6,
  },
  sectionHeader: {
    color: THEME.section,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: THEME.surface,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: THEME.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  nome: {
    color: THEME.text,
    fontWeight: "700",
  },
  preco: {
    color: THEME.accent,
    fontWeight: "800",
  },
  badge: {
    backgroundColor: THEME.badgeBg,
    color: THEME.badgeText,
    fontSize: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: THEME.border,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContent: {
    padding: 12,
    paddingBottom: 24,
  },
  empty: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    color: THEME.textMuted,
  },
});
