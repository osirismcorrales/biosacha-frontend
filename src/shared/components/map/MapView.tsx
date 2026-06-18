import React, { useRef } from 'react';
import { StyleSheet, View, DimensionValue, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

interface MapViewProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: DimensionValue;
  markers?: Array<{ id?: number | string; lat: number; lng: number; label?: string }>;
  onMarkerPress?: (id: string | number) => void;
}

const getMapHtml = (lat: number, lng: number, zoom: number, markers: MapViewProps['markers']) => {
  const markerCode = markers?.map((m, idx) => `
    var marker${idx} = L.marker([${m.lat}, ${m.lng}]).addTo(map);
    ${m.label ? `marker${idx}.bindPopup("${m.label}");` : ''}
    marker${idx}.on('click', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'markerPress', id: ${m.id !== undefined ? `"${m.id}"` : `"${idx}"`} }));
    });
  `).join('') || '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', {
      zoomControl: true,
      attributionControl: false
    }).setView([${lat}, ${lng}], ${zoom});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ''
    }).addTo(map);

    ${markerCode}
  </script>
</body>
</html>
`;
};

export function MapView({ latitude, longitude, zoom = 12, height = 250, markers, onMarkerPress }: MapViewProps) {
  const webviewRef = useRef<WebView>(null);

  const html = getMapHtml(latitude, longitude, zoom, markers);

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { height, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#C8E0C8' }]}>
        <Ionicons name="map-outline" size={48} color="#A8C896" style={{ marginBottom: 12 }} />
        <Text style={{ color: '#3D6B28', fontSize: 16, fontWeight: 'bold' }}>Mapa Interactivo</Text>
        <Text style={{ color: '#88b5a1', fontSize: 13, marginTop: 6, textAlign: 'center', paddingHorizontal: 30 }}>
          El visor de mapas está optimizado para la aplicación móvil. Abre la app desde tu celular para explorar los avistamientos.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { height }]}>
      <WebView
        ref={webviewRef}
        source={{ html }}
        style={styles.webview}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={['*']}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'markerPress' && onMarkerPress) {
              onMarkerPress(data.id);
            }
          } catch (e) {}
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});