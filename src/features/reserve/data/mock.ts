// Mock data for reserves — matches backend Reservation entity shape
export type ReserveMock = {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  province: string;
  imageUrl: string;
  status: 'open' | 'closed';
  closesIn?: string; // e.g. "5:30 hs"
  hectares: number;
  speciesCount: number;
  trailKm: number;
  durationHours: number;
  visitHours: string;
  guide: string;
  about: string;
  accessCode: string; // QR / manual code
  lat: number;
  lng: number;
};

export const mockReserves: ReserveMock[] = [
  {
    id: 'horco_molle',
    name: 'Horco Molle',
    subtitle: 'Tucumán, Argentina',
    location: 'Av. Horco Molle, Yerba Buena, Tucumán',
    province: 'Tucumán',
    imageUrl:
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop',
    status: 'open',
    closesIn: '5:30 hs',
    hectares: 18,
    speciesCount: 40,
    trailKm: 1,
    durationHours: 1,
    visitHours: 'Lunes a domingo · 9:00 – 18:00 hs',
    guide: 'Guardafaunas y estudiantes de Biología de la UNT',
    about:
      'Reserva experimental de fauna autóctona. Recorrido circular con especies rescatadas del comercio ilegal. Un pulmón verde en el corazón del Gran Tucumán.',
    accessCode: 'HORCO-2847',
    lat: -26.8241,
    lng: -65.2946,
  },
  {
    id: 'parque_copo',
    name: 'Parque Copo',
    subtitle: 'Santiago del Estero, Argentina',
    location: 'Copo, Santiago del Estero',
    province: 'Santiago del Estero',
    imageUrl:
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&h=600&fit=crop',
    status: 'closed',
    hectares: 114000,
    speciesCount: 90,
    trailKm: 5,
    durationHours: 4,
    visitHours: 'Martes a domingo · 8:00 – 16:00 hs',
    guide: 'Guardaparques nacionales',
    about:
      'Uno de los últimos reductos de bosque chaqueño seco. Hogar del yaguareté, el tapir y el oso hormiguero gigante.',
    accessCode: 'COPO-1122',
    lat: -25.9,
    lng: -61.8,
  },
];

export function getReserveById(id: string): ReserveMock | undefined {
  return mockReserves.find(r => r.id === id);
}
