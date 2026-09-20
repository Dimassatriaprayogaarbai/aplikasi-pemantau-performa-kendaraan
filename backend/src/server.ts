import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./database";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Zone Vehicle API berhasil berjalan",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT 1 AS hasil"
    );

    res.json({
      message: "Berhasil terhubung ke MySQL",
      database: rows,
    });
  } catch (error: any) {
    console.error(
      "ERROR TEST DATABASE:",
      error
    );

    res.status(500).json({
      message: "Gagal terhubung ke MySQL",
      error: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
    });
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const [kendaraan] = await db.query(`
      SELECT *
      FROM kendaraan
      ORDER BY created_at DESC
    `);

    const [servisTerbaru] = await db.query(`
      SELECT
        servis.*,
        kendaraan.nama_kendaraan
      FROM servis
      INNER JOIN kendaraan
        ON servis.kendaraan_id = kendaraan.id
      ORDER BY servis.tanggal DESC, servis.id DESC
      LIMIT 5
    `);

    const [totalKendaraan] = await db.query(`
      SELECT COUNT(*) AS total
      FROM kendaraan
    `);

    const [totalServis] = await db.query(`
      SELECT COUNT(*) AS total
      FROM servis
    `);

    const [totalBbm] = await db.query(`
      SELECT COUNT(*) AS total
      FROM bbm
    `);

    const [totalPengingat] = await db.query(`
      SELECT COUNT(*) AS total
      FROM pengingat
      WHERE status = 'aktif'
    `);

    res.json({
      totalKendaraan:
        (totalKendaraan as any)[0].total,

      totalServis:
        (totalServis as any)[0].total,

      totalBbm:
        (totalBbm as any)[0].total,

      totalPengingat:
        (totalPengingat as any)[0].total,

      kendaraan,

      servisTerbaru,
    });
  } catch (error: any) {
    console.error(
      "ERROR DASHBOARD:",
      error
    );

    res.status(500).json({
      message:
        "Gagal mengambil data dashboard",
      error: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
    });
  }
});

app.get("/api/kendaraan", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM kendaraan
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (error: any) {
    console.error(
      "ERROR GET KENDARAAN:",
      error
    );

    res.status(500).json({
      message:
        "Gagal mengambil data kendaraan",
      error: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
    });
  }
});

app.post("/api/kendaraan", async (req, res) => {
  try {
    const {
      nama_kendaraan,
      merk,
      tipe,
      tahun,
      nomor_polisi,
      warna,
      kilometer,
    } = req.body;

    console.log(
      "DATA KENDARAAN DITERIMA:",
      req.body
    );

    if (
      !nama_kendaraan ||
      !merk ||
      !tipe
    ) {
      return res.status(400).json({
        message:
          "Nama kendaraan, merk, dan tipe wajib diisi",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO kendaraan
      (
        nama_kendaraan,
        merk,
        tipe,
        tahun,
        nomor_polisi,
        warna,
        kilometer
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nama_kendaraan,
        merk,
        tipe,
        tahun || null,
        nomor_polisi || null,
        warna || null,
        kilometer || 0,
      ]
    );

    console.log(
      "KENDARAAN BERHASIL DISIMPAN:",
      result
    );

    res.status(201).json({
      message:
        "Kendaraan berhasil ditambahkan",

      id: (result as any).insertId,
    });
  } catch (error: any) {
    console.error(
      "ERROR TAMBAH KENDARAAN:",
      error
    );

    res.status(500).json({
      message:
        "Gagal menambahkan kendaraan",

      error: error.message,

      code: error.code,

      sqlMessage: error.sqlMessage,
    });
  }

  
});

app.put(
  "/api/kendaraan/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        nama_kendaraan,
        merk,
        tipe,
        tahun,
        nomor_polisi,
        warna,
        kilometer,
      } = req.body;

      console.log(
        "DATA UPDATE KENDARAAN:",
        id,
        req.body
      );

      if (
        !nama_kendaraan ||
        !merk ||
        !tipe
      ) {
        return res.status(400).json({
          message:
            "Nama kendaraan, merk, dan tipe wajib diisi",
        });
      }

      const [result] = await db.query(
        `
        UPDATE kendaraan
        SET
          nama_kendaraan = ?,
          merk = ?,
          tipe = ?,
          tahun = ?,
          nomor_polisi = ?,
          warna = ?,
          kilometer = ?
        WHERE id = ?
        `,
        [
          nama_kendaraan,
          merk,
          tipe,
          tahun || null,
          nomor_polisi || null,
          warna || null,
          kilometer || 0,
          id,
        ]
      );

      const affectedRows =
        (result as any).affectedRows;

      if (affectedRows === 0) {
        return res.status(404).json({
          message:
            "Kendaraan tidak ditemukan",
        });
      }

      console.log(
        `KENDARAAN ID ${id} BERHASIL DIUPDATE`
      );

      res.json({
        message:
          "Kendaraan berhasil diperbarui",
        id: id,
      });
    } catch (error: any) {
      console.error(
        "ERROR UPDATE KENDARAAN:",
        error
      );

      res.status(500).json({
        message:
          "Gagal memperbarui kendaraan",
        error: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      });
    }
  }
);

app.delete(
  "/api/kendaraan/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message:
            "ID kendaraan wajib diisi",
        });
      }
                                      
      const [result] = await db.query(
        `
        DELETE FROM kendaraan
        WHERE id = ?
        `,
        [id]
      );

      const affectedRows =
        (result as any).affectedRows;

      if (affectedRows === 0) {
        return res.status(404).json({
          message:
            "Kendaraan tidak ditemukan",
        });
      }

      console.log(
        `KENDARAAN ID ${id} BERHASIL DIHAPUS`
      );

      res.json({
        message:
          "Kendaraan berhasil dihapus",
      });
    } catch (error: any) {
      console.error(
        "ERROR HAPUS KENDARAAN:",
        error
      );

      res.status(500).json({
        message:
          "Gagal menghapus kendaraan",

        error: error.message,

        code: error.code,

        sqlMessage: error.sqlMessage,
      });
    }
  }
);

app.get("/api/servis", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        servis.*,
        kendaraan.nama_kendaraan
      FROM servis
      INNER JOIN kendaraan
        ON servis.kendaraan_id = kendaraan.id
      ORDER BY servis.tanggal DESC
    `);

    res.json(rows);
  } catch (error: any) {
    console.error(
      "ERROR GET SERVIS:",
      error
    );

    res.status(500).json({
      message:
        "Gagal mengambil data servis",
      error: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
    });
  }
});

app.post("/api/servis", async (req, res) => {
  try {
    const {
      kendaraan_id,
      jenis_servis,
      tanggal,
      kilometer,
      biaya,
      catatan,
    } = req.body;

    if (
      !kendaraan_id ||
      !jenis_servis ||
      !tanggal
    ) {
      return res.status(400).json({
        message:
          "Kendaraan, jenis servis, dan tanggal wajib diisi",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO servis
      (
        kendaraan_id,
        jenis_servis,
        tanggal,
        kilometer,
        biaya,
        catatan
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        kendaraan_id,
        jenis_servis,
        tanggal,
        kilometer || 0,
        biaya || 0,
        catatan || null,
      ]
    );

    res.status(201).json({
      message:
        "Data servis berhasil ditambahkan",

      id: (result as any).insertId,
    });
  } catch (error: any) {
    console.error(
      "ERROR TAMBAH SERVIS:",
      error
    );

    res.status(500).json({
      message:
        "Gagal menambahkan data servis",

      error: error.message,

      code: error.code,

      sqlMessage: error.sqlMessage,
    });
  }
});

app.put(
  "/api/servis/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        kendaraan_id,
        jenis_servis,
        tanggal,
        kilometer,
        biaya,
        catatan,
      } = req.body;

      console.log(
        "DATA UPDATE SERVIS:",
        id,
        req.body
      );

      if (
        !kendaraan_id ||
        !jenis_servis ||
        !tanggal
      ) {
        return res.status(400).json({
          message:
            "Kendaraan, jenis servis, dan tanggal wajib diisi",
        });
      }

      const [result] = await db.query(
        `
        UPDATE servis
        SET
          kendaraan_id = ?,
          jenis_servis = ?,
          tanggal = ?,
          kilometer = ?,
          biaya = ?,
          catatan = ?
        WHERE id = ?
        `,
        [
          kendaraan_id,
          jenis_servis,
          tanggal,
          kilometer || 0,
          biaya || 0,
          catatan || null,
          id,
        ]
      );

      const affectedRows =
        (result as any).affectedRows;

      if (affectedRows === 0) {
        return res.status(404).json({
          message: "Data servis tidak ditemukan",
        });
      }

      console.log(
        `SERVIS ID ${id} BERHASIL DIUPDATE`
      );

      res.json({
        message:
          "Data servis berhasil diperbarui",
        id,
      });
    } catch (error: any) {
      console.error(
        "ERROR UPDATE SERVIS:",
        error
      );

      res.status(500).json({
        message:
          "Gagal memperbarui data servis",
        error: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      });
    }
  }
);

app.delete(
  "/api/servis/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message: "ID servis wajib diisi",
        });
      }

      const [result] = await db.query(
        `
        DELETE FROM servis
        WHERE id = ?
        `,
        [id]
      );

      const affectedRows =
        (result as any).affectedRows;

      if (affectedRows === 0) {
        return res.status(404).json({
          message:
            "Data servis tidak ditemukan",
        });
      }

      console.log(
        `SERVIS ID ${id} BERHASIL DIHAPUS`
      );

      res.json({
        message:
          "Data servis berhasil dihapus",
      });
    } catch (error: any) {
      console.error(
        "ERROR HAPUS SERVIS:",
        error
      );

      res.status(500).json({
        message:
          "Gagal menghapus data servis",
        error: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      });
    }
  }
);

app.get("/api/bbm", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        bbm.*,
        kendaraan.nama_kendaraan
      FROM bbm
      INNER JOIN kendaraan
        ON bbm.kendaraan_id = kendaraan.id
      ORDER BY bbm.tanggal DESC, bbm.id DESC
    `);

    res.json(rows);
  } catch (error: any) {
    console.error(
      "ERROR GET BBM:",
      error
    );

    res.status(500).json({
      message:
        "Gagal mengambil data BBM",

      error: error.message,

      code: error.code,

      sqlMessage: error.sqlMessage,
    });
  }
});

app.post("/api/bbm", async (req, res) => {
  try {
    const {
      kendaraan_id,
      tanggal,
      jumlah_liter,
      harga_per_liter,
      total_harga,
      kilometer,
      jenis_bbm,
      catatan,
    } = req.body;

    if (
      !kendaraan_id ||
      !tanggal ||
      !jumlah_liter
    ) {
      return res.status(400).json({
        message:
          "Kendaraan, tanggal, dan jumlah liter wajib diisi",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO bbm
      (
        kendaraan_id,
        tanggal,
        jumlah_liter,
        harga_per_liter,
        total_harga,
        kilometer,
        jenis_bbm,
        catatan
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        kendaraan_id,
        tanggal,
        jumlah_liter,
        harga_per_liter || 0,
        total_harga || 0,
        kilometer || 0,
        jenis_bbm || null,
        catatan || null,
      ]
    );

    res.status(201).json({
      message:
        "Data BBM berhasil ditambahkan",

      id: (result as any).insertId,
    });
  } catch (error: any) {
    console.error(
      "ERROR TAMBAH BBM:",
      error
    );

    res.status(500).json({
      message:
        "Gagal menambahkan data BBM",

      error: error.message,

      code: error.code,

      sqlMessage: error.sqlMessage,
    });
  }
});

app.get(
  "/api/pengingat",
  async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT
          pengingat.*,
          kendaraan.nama_kendaraan
        FROM pengingat
        INNER JOIN kendaraan
          ON pengingat.kendaraan_id = kendaraan.id
        ORDER BY pengingat.tanggal ASC, pengingat.id DESC
      `);

      res.json(rows);
    } catch (error: any) {
      console.error(
        "ERROR GET PENGINGAT:",
        error
      );

      res.status(500).json({
        message:
          "Gagal mengambil data pengingat",
        error: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      });
    }
  }
);

app.post(
  "/api/pengingat",
  async (req, res) => {
    try {
      const {
        kendaraan_id,
        judul,
        tanggal,
        kilometer_target,
        deskripsi,
        status,
      } = req.body;

      console.log(
        "DATA PENGINGAT DITERIMA:",
        req.body
      );

      if (
        !kendaraan_id ||
        !judul ||
        !tanggal
      ) {
        return res.status(400).json({
          message:
            "Kendaraan, judul, dan tanggal wajib diisi",
        });
      }

      const [result] = await db.query(
        `
        INSERT INTO pengingat
        (
          kendaraan_id,
          judul,
          tanggal,
          kilometer_target,
          deskripsi,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          kendaraan_id,
          judul,
          tanggal,
          kilometer_target ?? null,
          deskripsi || null,
          status || "aktif",
        ]
      );

      const insertId =
        (result as any).insertId;

      console.log(
        "PENGINGAT BERHASIL DISIMPAN:",
        insertId
      );

      res.status(201).json({
        message:
          "Pengingat berhasil ditambahkan",
        id: insertId,
      });
    } catch (error: any) {
      console.error(
        "ERROR TAMBAH PENGINGAT:",
        error
      );

      res.status(500).json({
        message:
          "Gagal menambahkan pengingat",
        error: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      });
    }
  }
);

app.put(
  "/api/pengingat/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        kendaraan_id,
        judul,
        tanggal,
        kilometer_target,
        deskripsi,
        status,
      } = req.body;

      console.log(
        "DATA UPDATE PENGINGAT:",
        id,
        req.body
      );

      if (
        !kendaraan_id ||
        !judul ||
        !tanggal
      ) {
        return res.status(400).json({
          message:
            "Kendaraan, judul, dan tanggal wajib diisi",
        });
      }

      const [result] = await db.query(
        `
        UPDATE pengingat
        SET
          kendaraan_id = ?,
          judul = ?,
          tanggal = ?,
          kilometer_target = ?,
          deskripsi = ?,
          status = ?
        WHERE id = ?
        `,
        [
          kendaraan_id,
          judul,
          tanggal,
          kilometer_target ?? null,
          deskripsi || null,
          status || "aktif",
          id,
        ]
      );

      const affectedRows =
        (result as any).affectedRows;

      if (affectedRows === 0) {
        return res.status(404).json({
          message:
            "Data pengingat tidak ditemukan",
        });
      }

      console.log(
        `PENGINGAT ID ${id} BERHASIL DIUPDATE`
      );

      res.json({
        message:
          "Data pengingat berhasil diperbarui",
        id,
      });
    } catch (error: any) {
      console.error(
        "ERROR UPDATE PENGINGAT:",
        error
      );

      res.status(500).json({
        message:
          "Gagal memperbarui pengingat",
        error: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      });
    }
  }
);

app.delete(
  "/api/pengingat/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          message:
            "ID pengingat wajib diisi",
        });
      }

      const [result] = await db.query(
        `
        DELETE FROM pengingat
        WHERE id = ?
        `,
        [id]
      );

      const affectedRows =
        (result as any).affectedRows;

      if (affectedRows === 0) {
        return res.status(404).json({
          message:
            "Data pengingat tidak ditemukan",
        });
      }

      console.log(
        `PENGINGAT ID ${id} BERHASIL DIHAPUS`
      );

      res.json({
        message:
          "Data pengingat berhasil dihapus",
      });
    } catch (error: any) {
      console.error(
        "ERROR HAPUS PENGINGAT:",
        error
      );

      res.status(500).json({
        message:
          "Gagal menghapus data pengingat",
        error: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      });
    }
  }
);
const PORT = process.env.PORT || 3000;

app.listen(
  Number(PORT),
  "0.0.0.0",
  () => {
    console.log(
      `Server berjalan di http://localhost:${PORT}`
    );
  }
);