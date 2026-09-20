import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const API_URL = "http://192.168.1.10:3000";

export type Vehicle = {
  id: string;
  namaKendaraan: string;
  merek: string;
  tahun: string;
  nomorPolisi: string;
  kilometer: number;
  konsumsiBbm: string;
  tanggalStnk: string;
};

export type Service = {
  id: string;
  kendaraanId: string;
  jenisServis: string;
  tanggal: string;
  kilometer: number;
  biaya: number;
  catatan: string;
};

export type FuelRecord = {
  id: string;
  kendaraanId: string;
  tanggal: string;
  jumlahLiter: number;
  hargaPerLiter: number;
  totalHarga: number;
  kilometer: number;
  jenisBbm: string;
  catatan: string;
};

export type Reminder = {
  id: string;
  kendaraanId: string;
  judul: string;
  tanggal: string;
  kilometerTarget?: number;
  deskripsi: string;
  status: "aktif" | "selesai";
};

type AppContextType = {
  vehicles: Vehicle[];
  services: Service[];
  fuelRecords: FuelRecord[];
  reminders: Reminder[];

  loadingVehicles: boolean;
  loadingServices: boolean;

  addVehicle: (
    vehicle: Omit<Vehicle, "id">,
    id?: string
  ) => void;

  updateVehicle: (
    id: string,
    updatedVehicle: Omit<Vehicle, "id">
  ) => void;

  deleteVehicle: (
    id: string
  ) => Promise<boolean>;

  addService: (
    service: Omit<Service, "id">
  ) => Promise<boolean>;

  updateService: (
    id: string,
    updatedService: Omit<Service, "id">
  ) => Promise<boolean>;

  deleteService: (
    id: string
  ) => Promise<boolean>;

  addFuelRecord: (
    fuel: Omit<FuelRecord, "id">
  ) => Promise<boolean>;

  addReminder: (
    reminder: Omit<Reminder, "id">
  ) => Promise<boolean>;

  updateReminder: (
    id: string,
    updatedReminder: Omit<Reminder, "id">
  ) => Promise<boolean>;

  deleteReminder: (
    id: string
  ) => Promise<boolean>;

  loadVehicles: () => Promise<void>;

  loadServices: () => Promise<void>;

  loadReminders: () => Promise<void>;
};

const AppContext =
  createContext<AppContextType | undefined>(
    undefined
  );

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({
  children,
}: AppProviderProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(
    []
  );

  const [services, setServices] = useState<Service[]>(
    []
  );

  const [fuelRecords, setFuelRecords] = useState<
    FuelRecord[]
  >([]);

  const [reminders, setReminders] = useState<
    Reminder[]
  >([]);

  const [loadingVehicles, setLoadingVehicles] =
    useState(false);

  const [loadingServices, setLoadingServices] =
    useState(false);

  const loadVehicles = async () => {
    try {
      setLoadingVehicles(true);

      const response = await fetch(
        `${API_URL}/api/kendaraan`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal mengambil data kendaraan"
        );
      }

      const formattedVehicles: Vehicle[] =
        data.map((item: any) => ({
          id: String(item.id),
          namaKendaraan:
            item.nama_kendaraan || "",
          merek: item.merk || "",
          tahun: item.tahun
            ? String(item.tahun)
            : "",
          nomorPolisi:
            item.nomor_polisi || "",
          kilometer:
            Number(item.kilometer) || 0,
          konsumsiBbm: "",
          tanggalStnk: "",
        }));

      setVehicles(formattedVehicles);
    } catch (error) {
      console.error(
        "ERROR LOAD KENDARAAN:",
        error
      );
    } finally {
      setLoadingVehicles(false);
    }
  };

  const loadServices = async () => {
    try {
      setLoadingServices(true);

      const response = await fetch(
        `${API_URL}/api/servis`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal mengambil data servis"
        );
      }

      const formattedServices: Service[] =
        data.map((item: any) => ({
          id: String(item.id),

          kendaraanId: String(
            item.kendaraan_id
          ),

          jenisServis:
            item.jenis_servis || "",

          tanggal: item.tanggal
            ? String(item.tanggal).split("T")[0]
            : "",

          kilometer:
            Number(item.kilometer) || 0,

          biaya:
            Number(item.biaya) || 0,

          catatan:
            item.catatan || "",
        }));

      setServices(formattedServices);
    } catch (error) {
      console.error(
        "ERROR LOAD SERVIS:",
        error
      );
    } finally {
      setLoadingServices(false);
    }
  };

  const loadReminders = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/pengingat`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal mengambil data pengingat"
        );
      }

      const formattedReminders: Reminder[] =
        data.map((item: any) => ({
          id: String(item.id),

          kendaraanId: String(
            item.kendaraan_id
          ),

          judul:
            item.judul || "",

          tanggal: item.tanggal
            ? String(item.tanggal).split("T")[0]
            : "",

          kilometerTarget:
            item.kilometer_target !== null &&
            item.kilometer_target !== undefined
              ? Number(item.kilometer_target)
              : undefined,

          deskripsi:
            item.deskripsi || "",

          status:
            item.status === "selesai"
              ? "selesai"
              : "aktif",
        }));

      setReminders(formattedReminders);
    } catch (error) {
      console.error(
        "ERROR LOAD PENGINGAT:",
        error
      );
    }
  };

  const loadFuelRecords = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/bbm`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal mengambil data BBM"
        );
      }

      const formattedFuelRecords: FuelRecord[] =
        data.map((item: any) => ({
          id: String(item.id),

          kendaraanId: String(
            item.kendaraan_id
          ),

          tanggal: item.tanggal
            ? String(item.tanggal).split("T")[0]
            : "",

          jumlahLiter:
            Number(item.jumlah_liter) || 0,

          hargaPerLiter:
            Number(item.harga_per_liter) || 0,

          totalHarga:
            Number(item.total_harga) || 0,

          kilometer:
            Number(item.kilometer) || 0,

          jenisBbm:
            item.jenis_bbm || "",

          catatan:
            item.catatan || "",
        }));

      setFuelRecords(
        formattedFuelRecords
      );
    } catch (error) {
      console.error(
        "ERROR LOAD BBM:",
        error
      );
    }
  };

  useEffect(() => {
    loadVehicles();
    loadServices();
    loadReminders();
    loadFuelRecords();
  }, []);

  const addVehicle = (
    vehicle: Omit<Vehicle, "id">,
    id?: string
  ) => {
    setVehicles((current) => [
      ...current,
      {
        ...vehicle,
        id: id || Date.now().toString(),
      },
    ]);
  };

  const updateVehicle = (
    id: string,
    updatedVehicle: Omit<Vehicle, "id">
  ) => {
    setVehicles((current) =>
      current.map((vehicle) =>
        String(vehicle.id) === String(id)
          ? {
              ...updatedVehicle,
              id: vehicle.id,
            }
          : vehicle
      )
    );
  };

  const deleteVehicle = async (
    id: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/kendaraan/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal menghapus kendaraan"
        );
      }

      setVehicles((current) =>
        current.filter(
          (item) =>
            String(item.id) !== String(id)
        )
      );

      setServices((current) =>
        current.filter(
          (item) =>
            String(item.kendaraanId) !==
            String(id)
        )
      );

      setFuelRecords((current) =>
        current.filter(
          (item) =>
            String(item.kendaraanId) !==
            String(id)
        )
      );

      setReminders((current) =>
        current.filter(
          (item) =>
            String(item.kendaraanId) !==
            String(id)
        )
      );

      return true;
    } catch (error) {
      console.error(
        "ERROR DELETE VEHICLE:",
        error
      );

      return false;
    }
  };

  const addService = async (
    service: Omit<Service, "id">
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/servis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kendaraan_id:
              service.kendaraanId,

            jenis_servis:
              service.jenisServis,

            tanggal:
              service.tanggal,

            kilometer:
              service.kilometer,

            biaya:
              service.biaya,

            catatan:
              service.catatan || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal menambahkan servis"
        );
      }

      setServices((current) => [
        ...current,
        {
          ...service,
          id: String(data.id),
        },
      ]);

      return true;
    } catch (error) {
      console.error(
        "ERROR ADD SERVICE:",
        error
      );

      return false;
    }
  };

  const updateService = async (
    id: string,
    updatedService: Omit<Service, "id">
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/servis/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kendaraan_id:
              updatedService.kendaraanId,

            jenis_servis:
              updatedService.jenisServis,

            tanggal:
              updatedService.tanggal,

            kilometer:
              updatedService.kilometer,

            biaya:
              updatedService.biaya,

            catatan:
              updatedService.catatan || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal memperbarui servis"
        );
      }

      setServices((current) =>
        current.map((service) =>
          String(service.id) ===
          String(id)
            ? {
                ...updatedService,
                id: service.id,
              }
            : service
        )
      );

      return true;
    } catch (error) {
      console.error(
        "ERROR UPDATE SERVICE:",
        error
      );

      return false;
    }
  };

  const deleteService = async (
    id: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/servis/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal menghapus servis"
        );
      }

      setServices((current) =>
        current.filter(
          (service) =>
            String(service.id) !==
            String(id)
        )
      );

      return true;
    } catch (error) {
      console.error(
        "ERROR DELETE SERVICE:",
        error
      );

      return false;
    }
  };

  const addFuelRecord = async (
    fuel: Omit<FuelRecord, "id">
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/bbm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kendaraan_id:
              fuel.kendaraanId,

            tanggal:
              fuel.tanggal,

            jumlah_liter:
              fuel.jumlahLiter,

            harga_per_liter:
              fuel.hargaPerLiter,

            total_harga:
              fuel.totalHarga,

            kilometer:
              fuel.kilometer,

            jenis_bbm:
              fuel.jenisBbm || null,

            catatan:
              fuel.catatan || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal menyimpan pengisian BBM"
        );
      }

      setFuelRecords((current) => [
        ...current,
        {
          ...fuel,
          id: String(data.id),
        },
      ]);

      return true;
    } catch (error) {
      console.error(
        "ERROR ADD BBM:",
        error
      );

      return false;
    }
  };

  const addReminder = async (
    reminder: Omit<Reminder, "id">
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/pengingat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kendaraan_id:
              reminder.kendaraanId,

            judul:
              reminder.judul,

            tanggal:
              reminder.tanggal,

            kilometer_target:
              reminder.kilometerTarget ??
              null,

            deskripsi:
              reminder.deskripsi || null,

            status:
              reminder.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal menambahkan pengingat"
        );
      }

      setReminders((current) => [
        ...current,
        {
          ...reminder,
          id: String(data.id),
        },
      ]);

      return true;
    } catch (error) {
      console.error(
        "ERROR ADD REMINDER:",
        error
      );

      return false;
    }
  };

  const updateReminder = async (
    id: string,
    updatedReminder: Omit<Reminder, "id">
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/pengingat/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kendaraan_id:
              updatedReminder.kendaraanId,

            judul:
              updatedReminder.judul,

            tanggal:
              updatedReminder.tanggal,

            kilometer_target:
              updatedReminder.kilometerTarget ??
              null,

            deskripsi:
              updatedReminder.deskripsi ||
              null,

            status:
              updatedReminder.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal memperbarui pengingat"
        );
      }

      setReminders((current) =>
        current.map((reminder) =>
          String(reminder.id) ===
          String(id)
            ? {
                ...updatedReminder,
                id: reminder.id,
              }
            : reminder
        )
      );

      return true;
    } catch (error) {
      console.error(
        "ERROR UPDATE REMINDER:",
        error
      );

      return false;
    }
  };

  const deleteReminder = async (
    id: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_URL}/api/pengingat/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Gagal menghapus pengingat"
        );
      }

      setReminders((current) =>
        current.filter(
          (reminder) =>
            String(reminder.id) !==
            String(id)
        )
      );

      return true;
    } catch (error) {
      console.error(
        "ERROR DELETE REMINDER:",
        error
      );

      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        services,
        fuelRecords,
        reminders,

        loadingVehicles,
        loadingServices,

        addVehicle,
        updateVehicle,
        deleteVehicle,

        addService,
        updateService,
        deleteService,

        addFuelRecord,

        addReminder,
        updateReminder,
        deleteReminder,

        loadVehicles,
        loadServices,
        loadReminders,
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