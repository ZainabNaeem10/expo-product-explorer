import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type Category = "All" | "Electronics" | "Clothing";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: string;
};

const categories: Category[] = ["All", "Electronics", "Clothing"];

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$59.99",
  },
  { id: 2, name: "Classic T-Shirt", category: "Clothing", price: "$24.00" },
  { id: 3, name: "Smart Watch", category: "Electronics", price: "$89.50" },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const theme = useTheme();
  const visibleProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Product Explorer
            </ThemedText>
            <ThemedText style={styles.studentInfo}>Zainab Naeem</ThemedText>
            <ThemedText style={styles.studentInfo}>23I-0065</ThemedText>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Products
            </ThemedText>
            <ThemedText themeColor="textSecondary">
              Browse a few picks from our collection.
            </ThemedText>

            <ThemedView style={styles.filters}>
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <Pressable
                    key={category}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => setSelectedCategory(category)}
                    style={({ pressed }) => [
                      styles.filterButton,
                      {
                        backgroundColor: isSelected
                          ? theme.text
                          : theme.backgroundElement,
                        opacity: pressed ? 0.75 : 1,
                      },
                    ]}
                  >
                    <ThemedText
                      style={{
                        color: isSelected ? theme.background : theme.text,
                      }}
                    >
                      {category}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </ThemedView>

            <ThemedView style={styles.productList}>
              {visibleProducts.map((product) => (
                <ThemedView
                  key={product.id}
                  type="backgroundElement"
                  style={styles.productCard}
                >
                  <ThemedView style={styles.productDetails}>
                    <ThemedText type="small" themeColor="textSecondary">
                      {product.category}
                    </ThemedText>
                    <ThemedText type="smallBold">{product.name}</ThemedText>
                  </ThemedView>
                  <ThemedText type="smallBold">{product.price}</ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    gap: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.two,
  },
  header: {
    alignItems: "center",
    gap: Spacing.one,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    textAlign: "center",
  },
  studentInfo: {
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  filterButton: {
    alignItems: "center",
    borderRadius: 24,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  productList: {
    gap: Spacing.two,
  },
  productCard: {
    alignItems: "center",
    borderRadius: Spacing.three,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Spacing.three,
  },
  productDetails: {
    gap: Spacing.one,
  },
});
