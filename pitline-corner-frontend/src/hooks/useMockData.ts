import type { Race, Driver, LapData, PitStop } from '@/types'

// Mock races data
export const mockRaces: Race[] = [
  {
    id: 1,
    season: 2024,
    round: 1,
    name: 'Bahrain Grand Prix',
    circuit_name: 'Bahrain International Circuit',
    country: 'Bahrain',
    date: '2024-03-02T15:00:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2024-03-03T10:00:00Z'
  },
  {
    id: 2,
    season: 2024,
    round: 2,
    name: 'Saudi Arabian Grand Prix',
    circuit_name: 'Jeddah Corniche Circuit',
    country: 'Saudi Arabia',
    date: '2024-03-09T18:00:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2024-03-10T10:00:00Z'
  },
  {
    id: 3,
    season: 2024,
    round: 3,
    name: 'Australian Grand Prix',
    circuit_name: 'Melbourne Grand Prix Circuit',
    country: 'Australia',
    date: '2024-03-24T06:00:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2024-03-25T10:00:00Z'
  },
  {
    id: 4,
    season: 2024,
    round: 4,
    name: 'Japanese Grand Prix',
    circuit_name: 'Suzuka Circuit',
    country: 'Japan',
    date: '2024-04-07T06:00:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2024-04-08T10:00:00Z'
  },
  {
    id: 5,
    season: 2024,
    round: 5,
    name: 'Chinese Grand Prix',
    circuit_name: 'Shanghai International Circuit',
    country: 'China',
    date: '2024-04-21T08:00:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2024-04-22T10:00:00Z'
  },
  {
    id: 6,
    season: 2024,
    round: 6,
    name: 'Miami Grand Prix',
    circuit_name: 'Miami International Autodrome',
    country: 'United States',
    date: '2024-05-05T20:30:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2024-05-06T10:00:00Z'
  },
  {
    id: 7,
    season: 2024,
    round: 7,
    name: 'Monaco Grand Prix',
    circuit_name: 'Circuit de Monaco',
    country: 'Monaco',
    date: '2024-05-26T15:00:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2024-05-27T10:00:00Z'
  },
  {
    id: 8,
    season: 2024,
    round: 8,
    name: 'Canadian Grand Prix',
    circuit_name: 'Circuit Gilles Villeneuve',
    country: 'Canada',
    date: '2024-06-09T19:00:00Z',
    status: 'scheduled',
    data_imported: false
  },
  {
    id: 9,
    season: 2024,
    round: 9,
    name: 'Spanish Grand Prix',
    circuit_name: 'Circuit de Barcelona-Catalunya',
    country: 'Spain',
    date: '2024-06-23T15:00:00Z',
    status: 'scheduled',
    data_imported: false
  },
  {
    id: 10,
    season: 2024,
    round: 10,
    name: 'Austrian Grand Prix',
    circuit_name: 'Red Bull Ring',
    country: 'Austria',
    date: '2024-06-30T15:00:00Z',
    status: 'scheduled',
    data_imported: false
  },
  // Historic races
  {
    id: 101,
    season: 2023,
    round: 7,
    name: 'Monaco Grand Prix',
    circuit_name: 'Circuit de Monaco',
    country: 'Monaco',
    date: '2023-05-28T15:00:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2023-05-29T10:00:00Z'
  },
  {
    id: 102,
    season: 2023,
    round: 9,
    name: 'British Grand Prix',
    circuit_name: 'Silverstone Circuit',
    country: 'United Kingdom',
    date: '2023-07-09T16:00:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2023-07-10T10:00:00Z'
  },
  {
    id: 103,
    season: 2022,
    round: 10,
    name: 'British Grand Prix',
    circuit_name: 'Silverstone Circuit',
    country: 'United Kingdom',
    date: '2022-07-03T16:00:00Z',
    status: 'completed',
    data_imported: true,
    imported_at: '2022-07-04T10:00:00Z'
  }
]

// Mock drivers data
export const mockDrivers: Driver[] = [
  { id: 1, driver_number: 1, code: 'VER', first_name: 'Max', last_name: 'Verstappen', team: 'Red Bull' },
  { id: 2, driver_number: 11, code: 'PER', first_name: 'Sergio', last_name: 'Perez', team: 'Red Bull' },
  { id: 3, driver_number: 16, code: 'LEC', first_name: 'Charles', last_name: 'Leclerc', team: 'Ferrari' },
  { id: 4, driver_number: 55, code: 'SAI', first_name: 'Carlos', last_name: 'Sainz', team: 'Ferrari' },
  { id: 5, driver_number: 44, code: 'HAM', first_name: 'Lewis', last_name: 'Hamilton', team: 'Mercedes' },
  { id: 6, driver_number: 63, code: 'RUS', first_name: 'George', last_name: 'Russell', team: 'Mercedes' },
  { id: 7, driver_number: 4, code: 'NOR', first_name: 'Lando', last_name: 'Norris', team: 'McLaren' },
  { id: 8, driver_number: 81, code: 'PIA', first_name: 'Oscar', last_name: 'Piastri', team: 'McLaren' },
  { id: 9, driver_number: 14, code: 'ALO', first_name: 'Fernando', last_name: 'Alonso', team: 'Aston Martin' },
  { id: 10, driver_number: 18, code: 'STR', first_name: 'Lance', last_name: 'Stroll', team: 'Aston Martin' },
  { id: 11, driver_number: 20, code: 'MAG', first_name: 'Kevin', last_name: 'Magnussen', team: 'Haas' },
  { id: 12, driver_number: 27, code: 'HUL', first_name: 'Nico', last_name: 'Hulkenberg', team: 'Haas' },
  { id: 13, driver_number: 31, code: 'OCO', first_name: 'Esteban', last_name: 'Ocon', team: 'Alpine' },
  { id: 14, driver_number: 10, code: 'GAS', first_name: 'Pierre', last_name: 'Gasly', team: 'Alpine' },
  { id: 15, driver_number: 22, code: 'TSU', first_name: 'Yuki', last_name: 'Tsunoda', team: 'AlphaTauri' },
  { id: 16, driver_number: 23, code: 'ALB', first_name: 'Alexander', last_name: 'Albon', team: 'AlphaTauri' },
  { id: 17, driver_number: 77, code: 'BOT', first_name: 'Valtteri', last_name: 'Bottas', team: 'Alfa Romeo' },
  { id: 18, driver_number: 24, code: 'ZHOU', first_name: 'Guanyu', last_name: 'Zhou', team: 'Alfa Romeo' },
  { id: 19, driver_number: 3, code: 'RIC', first_name: 'Daniel', last_name: 'Ricciardo', team: 'AlphaTauri' },
  { id: 20, driver_number: 2, code: 'SAR', first_name: 'Logan', last_name: 'Sargeant', team: 'Williams' }
]

// Generate mock lap data for a race
export const generateMockLapData = (raceId: number, totalLaps: number = 50): LapData[] => {
  const lapData: LapData[] = []
  
  for (let lap = 1; lap <= totalLaps; lap++) {
    for (let driverIndex = 0; driverIndex < 20; driverIndex++) {
      const driverId = driverIndex + 1
      const position = ((driverIndex + lap - 2) % 20) + 1
      
      lapData.push({
        id: lapData.length + 1,
        race_id: raceId,
        driver_id: driverId,
        lap_number: lap,
        position,
        lap_time_seconds: 82.456 + Math.random() * 5 - 2.5,
        sector_times: {
          sector1: 28.123 + Math.random() * 2 - 1,
          sector2: 30.234 + Math.random() * 2 - 1,
          sector3: 24.099 + Math.random() * 2 - 1
        },
        tire_compound: ['SOFT', 'MEDIUM', 'HARD'][Math.floor(Math.random() * 3)] as 'SOFT' | 'MEDIUM' | 'HARD',
        tire_age: Math.floor(Math.random() * 30),
        gap_to_leader: position === 1 ? 0 : (position - 1) * 1.234 + Math.random() * 0.5
      })
    }
  }
  
  return lapData
}

// Generate mock pit stops for a race
export const generateMockPitStops = (raceId: number): PitStop[] => {
  const pitStops: PitStop[] = []
  
  for (let driverId = 1; driverId <= 20; driverId++) {
    const stopCount = Math.floor(Math.random() * 3) + 1 // 1-3 stops per driver
    
    for (let stop = 1; stop <= stopCount; stop++) {
      pitStops.push({
        id: pitStops.length + 1,
        race_id: raceId,
        driver_id: driverId,
        stop_number: stop,
        lap: Math.floor(Math.random() * 40) + 10, // Stop between lap 10-50
        duration_seconds: 2.5 + Math.random() * 1.5, // 2.5-4 seconds
        tire_compound_after: ['SOFT', 'MEDIUM', 'HARD'][Math.floor(Math.random() * 3)]
      })
    }
  }
  
  return pitStops.sort((a, b) => a.lap - b.lap)
}
