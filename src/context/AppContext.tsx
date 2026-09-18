import React, {
  createContext,
  useContext,
  useState,
} from "react";

type Vehicle = {
  id: string;
  namaKendaraan: string;
  merek: string;
  tahun: string;
  nomorPolisi: string;
  kilometer: number;
  konsumsiBbm: string;
  tanggalStnk: string;
};

type Service = {
  id: string;
  kendaraanId: string;
  jenisServis: string;
  tanggal: string;
  kilometer: number;
  biaya: number;
  catatan: string;
};

type Reminder = {
  id: string;
  kendaraanId: string;
  jenis: string;
  targetKilometer: number;
  targetTanggal: string;
};

type FuelRecord = {
  id: string;
  kendaraanId: string;
  tanggal: string;
  kilometer: number;
  liter: number;
  biaya: number;
};

type AppContextType = {
  vehicles: Vehicle[];
  services: Service[];
  reminders: Reminder[];
  fuelRecords: FuelRecord[];

  addVehicle: (
    vehicle: Omit<Vehicle, "id">
  ) => void;

  updateVehicle: (
    id: string,
    vehicle: Omit<Vehicle, "id">
  ) => void;

  deleteVehicle: (id: string) => void;

  addService: (
    service: Omit<Service, "id">
  ) => void;

  updateService: (
    id: string,
    service: Omit<Service, "id">
  ) => void;

  deleteService: (id: string) => void;

  addReminder: (
    reminder: Omit<Reminder, "id">
  ) => void;

  updateReminder: (
    id: string,
    reminder: Omit<Reminder, "id">
  ) => void;

  deleteReminder: (id: string) => void;

  addFuelRecord: (
    record: Omit<FuelRecord, "id">
  ) => void;
};

const AppContext =
  createContext<AppContextType | undefined>(
    undefined
  );

const initialVehicles: Vehicle[] = [
  {
    id: "1",
    namaKendaraan: "Honda Civic",
    merek: "Honda",
    tahun: "2020",
    nomorPolisi: "B 1234 ABC",
    kilometer: 45200,
    konsumsiBbm: "12 km/l",
    tanggalStnk: "20/09/2026",
  },
  {
    id: "2",
    namaKendaraan: "Toyota Avanza",
    merek: "Toyota",
    tahun: "2021",
    nomorPolisi: "B 5678 XYZ",
    kilometer: 62100,
    konsumsiBbm: "14 km/l",
    tanggalStnk: "15/10/2026",
  },
];

const initialServices: Service[] = [
  {
    id: "1",
    kendaraanId: "1",
    jenisServis: "Ganti Oli",
    tanggal: "10/08/2026",
    kilometer: 40000,
    biaya: 350000,
    catatan: "Ganti oli mesin",
  },
];

const initialReminders: Reminder[] = [
  {
    id: "1",
    kendaraanId: "1",
    jenis: "Ganti Oli",
    targetKilometer: 50000,
    targetTanggal: "20/09/2026",
  },
];

const initialFuelRecords: FuelRecord[] = [];

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [vehicles, setVehicles] =
    useState<Vehicle[]>(initialVehicles);

  const [services, setServices] =
    useState<Service[]>(initialServices);

  const [reminders, setReminders] =
    useState<Reminder[]>(initialReminders);

  const [fuelRecords, setFuelRecords] =
    useState<FuelRecord[]>(
      initialFuelRecords
    );

  const addVehicle = (
    vehicle: Omit<Vehicle, "id">
  ) => {
    setVehicles((current) => [
      ...current,
      {
        ...vehicle,
        id: Date.now().toString(),
      },
    ]);
  };

  const updateVehicle = (
    id: string,
    vehicle: Omit<Vehicle, "id">
  ) => {
    setVehicles((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...vehicle,
              id,
            }
          : item
      )
    );
  };

  const deleteVehicle = (id: string) => {
    setVehicles((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    setServices((current) =>
      current.filter(
        (item) =>
          item.kendaraanId !== id
      )
    );

    setReminders((current) =>
      current.filter(
        (item) =>
          item.kendaraanId !== id
      )
    );

    setFuelRecords((current) =>
      current.filter(
        (item) =>
          item.kendaraanId !== id
      )
    );
  };

  const addService = (
    service: Omit<Service, "id">
  ) => {
    setServices((current) => [
      ...current,
      {
        ...service,
        id: Date.now().toString(),
      },
    ]);
  };

  const updateService = (
    id: string,
    service: Omit<Service, "id">
  ) => {
    setServices((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...service,
              id,
            }
          : item
      )
    );
  };

  const deleteService = (id: string) => {
    setServices((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  const addReminder = (
    reminder: Omit<Reminder, "id">
  ) => {
    setReminders((current) => [
      ...current,
      {
        ...reminder,
        id: Date.now().toString(),
      },
    ]);
  };

  const updateReminder = (
    id: string,
    reminder: Omit<Reminder, "id">
  ) => {
    setReminders((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...reminder,
              id,
            }
          : item
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  const addFuelRecord = (
    record: Omit<FuelRecord, "id">
  ) => {
    setFuelRecords((current) => [
      ...current,
      {
        ...record,
        id: Date.now().toString(),
      },
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        services,
        reminders,
        fuelRecords,

        addVehicle,
        updateVehicle,
        deleteVehicle,

        addService,
        updateService,
        deleteService,

        addReminder,
        updateReminder,
        deleteReminder,

        addFuelRecord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useApp harus digunakan di dalam AppProvider"
    );
  }

  return context;
}