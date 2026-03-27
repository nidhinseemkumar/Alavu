import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AMBER = '#FFAB00';
const AMBER_GLOW = '#FFD600';
const DARK_BG = '#0F0F0F';
const CARD_BG = '#1A1A1A';
const INPUT_BG = '#252525';
const LIGHT_TEXT = '#FFFFFF';
const SUB_TEXT = '#999999';

const UNITS = [
  { label: 'm', value: 'm', factor: 1 },
  { label: 'cm', value: 'cm', factor: 0.01 },
  { label: 'in', value: 'in', factor: 0.0254 },
  { label: 'ft', value: 'ft', factor: 0.3048 },
];

const InputSection = ({ label, value, onChangeText, unit, onUnitChange, inputRef, onSubmitEditing, returnKeyType, onFocus }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#444"
          maxLength={10}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType || "next"}
          blurOnSubmit={returnKeyType === "done"}
          onFocus={onFocus}
        />
        <TouchableOpacity 
          style={styles.customPickerButton} 
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.customPickerText}>{unit}</Text>
          <Text style={styles.customPickerIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {UNITS.map(u => (
              <TouchableOpacity 
                key={u.value} 
                style={styles.modalItem} 
                onPress={() => { onUnitChange(u.value); setModalVisible(false); }}
              >
                <Text style={[styles.modalItemText, unit === u.value && styles.modalItemSelected]}>
                  {u.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default function App() {
  const [shape, setShape] = useState('cuboid'); // 'cuboid' or 'cylinder'
  
  // Cuboid states
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [lengthUnit, setLengthUnit] = useState('m');
  const [widthUnit, setWidthUnit] = useState('m');
  const [heightUnit, setHeightUnit] = useState('m');

  // Cylinder states
  const [radius, setRadius] = useState('');
  const [cHeight, setCHeight] = useState('');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [cHeightUnit, setCHeightUnit] = useState('m');

  // Input Refs for focusing next field
  const widthRef = useRef(null);
  const heightRef = useRef(null);
  const cHeightRef = useRef(null);
  const scrollRef = useRef(null);

  const handleFocus = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  const [results, setResults] = useState({ m3: '0.000' });

  const clearAll = () => {
    setLength('');
    setWidth('');
    setHeight('');
    setRadius('');
    setCHeight('');
    setResults({ m3: '0.000' });
  };

  const getFactor = (unitValue) => {
    return UNITS.find(u => u.value === unitValue).factor;
  };

  useEffect(() => {
    calculateVolume();
  }, [length, width, height, lengthUnit, widthUnit, heightUnit, radius, cHeight, radiusUnit, cHeightUnit, shape]);

  const calculateVolume = () => {
    let volumeM3 = 0;

    if (shape === 'cuboid') {
      const L = parseFloat(length) || 0;
      const W = parseFloat(width) || 0;
      const H = parseFloat(height) || 0;
      
      const Lm = L * getFactor(lengthUnit);
      const Wm = W * getFactor(widthUnit);
      const Hm = H * getFactor(heightUnit);
      
      volumeM3 = Lm * Wm * Hm;
    } else {
      const R = parseFloat(radius) || 0;
      const H = parseFloat(cHeight) || 0;
      
      const Rm = R * getFactor(radiusUnit);
      const Hm = H * getFactor(cHeightUnit);
      
      volumeM3 = Math.PI * Math.pow(Rm, 2) * Hm;
    }

    setResults({
      m3: volumeM3.toFixed(3)
    });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" translucent={false} />
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="cube-outline" size={46} color={AMBER} style={styles.logo} />
          <Text style={styles.headerTitle}>Alavu</Text>
          <Text style={styles.headerSubtitle}>Material Volume Calculator</Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.resultsAreaTop}>
            <View style={styles.unifiedResultCard}>
              <View style={styles.unifiedLeftBlock}>
                {shape === 'cuboid' ? (
                  <View>
                    <View style={styles.echoRow}><Text style={styles.echoLabel}>L:</Text><Text style={styles.echoVal}>{length || '0'}</Text><Text style={styles.echoUnit}>{lengthUnit}</Text></View>
                    <View style={styles.echoRow}><Text style={styles.echoLabel}>W:</Text><Text style={styles.echoVal}>{width || '0'}</Text><Text style={styles.echoUnit}>{widthUnit}</Text></View>
                    <View style={styles.echoRow}><Text style={styles.echoLabel}>H:</Text><Text style={styles.echoVal}>{height || '0'}</Text><Text style={styles.echoUnit}>{heightUnit}</Text></View>
                  </View>
                ) : (
                  <View>
                    <View style={styles.echoRow}><Text style={styles.echoLabel}>R:</Text><Text style={styles.echoVal}>{radius || '0'}</Text><Text style={styles.echoUnit}>{radiusUnit}</Text></View>
                    <View style={styles.echoRow}><Text style={styles.echoLabel}>H:</Text><Text style={styles.echoVal}>{cHeight || '0'}</Text><Text style={styles.echoUnit}>{cHeightUnit}</Text></View>
                  </View>
                )}
              </View>

              <View style={styles.unifiedDivider} />

              <View style={styles.unifiedRightBlock}>
                <Text style={styles.resultVal}>{results.m3}</Text>
                <Text style={styles.resultLabel}>Volume</Text>
                <View style={styles.unitBadge}>
                  <Text style={styles.unitBadgeText}>m³</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.shapeToggleContainer}>
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.toggleButton, shape === 'cuboid' && styles.activeToggleButton]}
              onPress={() => setShape('cuboid')}
            >
              <Text style={[styles.toggleText, shape === 'cuboid' && styles.activeToggleText]}>Cuboid</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.toggleButton, shape === 'cylinder' && styles.activeToggleButton]}
              onPress={() => setShape('cylinder')}
            >
              <Text style={[styles.toggleText, shape === 'cylinder' && styles.activeToggleText]}>Cylinder</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.calculatorCard}>
            {shape === 'cuboid' ? (
              <View>
                <InputSection 
                  label="Length" 
                  value={length} 
                  onChangeText={setLength} 
                  unit={lengthUnit} 
                  onUnitChange={setLengthUnit} 
                  onSubmitEditing={() => widthRef.current?.focus()}
                  onFocus={handleFocus}
                />
                <InputSection 
                  label="Width" 
                  value={width} 
                  onChangeText={setWidth} 
                  unit={widthUnit} 
                  onUnitChange={setWidthUnit} 
                  inputRef={widthRef}
                  onSubmitEditing={() => heightRef.current?.focus()}
                  onFocus={handleFocus}
                />
                <InputSection 
                  label="Height" 
                  value={height} 
                  onChangeText={setHeight} 
                  unit={heightUnit} 
                  onUnitChange={setHeightUnit} 
                  inputRef={heightRef}
                  returnKeyType="done"
                  onFocus={handleFocus}
                />
              </View>
            ) : (
              <View>
                <InputSection 
                  label="Radius" 
                  value={radius} 
                  onChangeText={setRadius} 
                  unit={radiusUnit} 
                  onUnitChange={setRadiusUnit} 
                  onSubmitEditing={() => cHeightRef.current?.focus()}
                  onFocus={handleFocus}
                />
                <InputSection 
                  label="Height" 
                  value={cHeight} 
                  onChangeText={setCHeight} 
                  unit={cHeightUnit} 
                  onUnitChange={setCHeightUnit} 
                  inputRef={cHeightRef}
                  returnKeyType="done"
                  onFocus={handleFocus}
                />
              </View>
            )}

            <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
              <Text style={styles.clearBtnText}>Clear All Inputs</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} />

          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>
              © {new Date().getFullYear()} Nidhin Seemkumar. All Rights Reserved.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  headerBackground: {
    backgroundColor: CARD_BG,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
  },
  header: {
    paddingHorizontal: 25,
    paddingBottom: 4,
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    color: AMBER,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    color: SUB_TEXT,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 0,
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexGrow: 1,
  },
  shapeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 4,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 15,
  },
  activeToggleButton: {
    backgroundColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleText: {
    color: SUB_TEXT,
    fontSize: 17,
    fontWeight: '700',
  },
  activeToggleText: {
    color: AMBER,
  },
  calculatorCard: {
    backgroundColor: CARD_BG,
    borderRadius: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    color: AMBER,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  inputRow: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 3,
    backgroundColor: INPUT_BG,
    color: LIGHT_TEXT,
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#333',
  },
  customPickerButton: {
    flex: 2,
    marginLeft: 12,
    backgroundColor: INPUT_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  customPickerText: {
    color: AMBER,
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  customPickerIcon: {
    color: SUB_TEXT,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    width: '75%',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  modalItem: {
    paddingVertical: 18,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  modalItemText: {
    color: LIGHT_TEXT,
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  modalItemSelected: {
    color: AMBER,
    fontWeight: '900',
  },
  clearBtn: {
    marginTop: 5,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 15,
    alignItems: 'center',
  },
  clearBtnText: {
    color: SUB_TEXT,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  resultsAreaTop: {
    marginBottom: 15,
  },
  unifiedResultCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: CARD_BG,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 105,
  },
  unifiedLeftBlock: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  unifiedDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#333',
    marginHorizontal: 15,
  },
  unifiedRightBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  echoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  echoLabel: {
    color: SUB_TEXT,
    fontSize: 13,
    fontWeight: '700',
    width: 22,
  },
  echoVal: {
    color: LIGHT_TEXT,
    fontWeight: '900',
    fontSize: 18,
  },
  echoUnit: {
    color: AMBER,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  resultVal: {
    color: AMBER,
    fontSize: 26,
    fontWeight: '900',
  },
  resultLabel: {
    color: SUB_TEXT,
    fontSize: 11,
    textTransform: 'uppercase',
    marginTop: 4,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  unitBadge: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  unitBadgeText: {
    color: AMBER,
    fontSize: 12,
    fontWeight: '900',
  },
  disclaimerContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  disclaimerText: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
