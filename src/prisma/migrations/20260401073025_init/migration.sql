-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nis` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `userRole` ENUM('ADMIN', 'PETUGAS', 'STUDENT') NOT NULL DEFAULT 'STUDENT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Student_nis_key`(`nis`),
    UNIQUE INDEX `Student_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Walas` (
    `id_walas` INTEGER NOT NULL AUTO_INCREMENT,
    `nis` VARCHAR(191) NOT NULL,
    `name_walas` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Walas_nis_key`(`nis`),
    PRIMARY KEY (`id_walas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `stok` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjamanBuku` (
    `id_peminjaman` INTEGER NOT NULL AUTO_INCREMENT,
    `id_students` INTEGER NOT NULL,
    `id_buku` INTEGER NOT NULL,
    `Tanggal_Pinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Tanggal_Kembali` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DIPINJAM',

    PRIMARY KEY (`id_peminjaman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengembalian` (
    `id_pengembalian` INTEGER NOT NULL AUTO_INCREMENT,
    `id_peminjaman` INTEGER NOT NULL,
    `tanggal_kembali` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `denda` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Pengembalian_id_peminjaman_key`(`id_peminjaman`),
    PRIMARY KEY (`id_pengembalian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `peminjamanBuku` ADD CONSTRAINT `peminjamanBuku_id_students_fkey` FOREIGN KEY (`id_students`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjamanBuku` ADD CONSTRAINT `peminjamanBuku_id_buku_fkey` FOREIGN KEY (`id_buku`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengembalian` ADD CONSTRAINT `Pengembalian_id_peminjaman_fkey` FOREIGN KEY (`id_peminjaman`) REFERENCES `peminjamanBuku`(`id_peminjaman`) ON DELETE RESTRICT ON UPDATE CASCADE;
