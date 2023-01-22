-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `createdOn` VARCHAR(191) NOT NULL,
    `profileImageUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `postAuthorId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `postCaption` VARCHAR(191) NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `createdOn` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostMedia` (
    `postMediaId` VARCHAR(191) NOT NULL,
    `postMediaType` VARCHAR(191) NOT NULL,
    `postMediaURL` VARCHAR(191) NOT NULL,
    `postMediaPostId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`postMediaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `commentId` VARCHAR(191) NOT NULL,
    `commentContent` VARCHAR(191) NOT NULL,
    `commentCreatedAt` VARCHAR(191) NOT NULL,
    `commentCreatedOn` VARCHAR(191) NOT NULL,
    `commentAuthorId` VARCHAR(191) NOT NULL,
    `commentPostId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `likeId` VARCHAR(191) NOT NULL,
    `likeCreatedAt` VARCHAR(191) NOT NULL,
    `likeCreatedOn` VARCHAR(191) NOT NULL,
    `likePostId` VARCHAR(191) NOT NULL,
    `likeUserId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`likeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `View` (
    `viewId` VARCHAR(191) NOT NULL,
    `viewCreatedAt` VARCHAR(191) NOT NULL,
    `viewCreatedOn` VARCHAR(191) NOT NULL,
    `viewPostId` VARCHAR(191) NOT NULL,
    `viewUserId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`viewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Follower` (
    `followerId` VARCHAR(191) NOT NULL,
    `followerUserId` VARCHAR(191) NOT NULL,
    `followedUserId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`followerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_postAuthorId_fkey` FOREIGN KEY (`postAuthorId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_postMediaPostId_fkey` FOREIGN KEY (`postMediaPostId`) REFERENCES `Post`(`postId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentPostId_fkey` FOREIGN KEY (`commentPostId`) REFERENCES `Post`(`postId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentAuthorId_fkey` FOREIGN KEY (`commentAuthorId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_likePostId_fkey` FOREIGN KEY (`likePostId`) REFERENCES `Post`(`postId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_likeUserId_fkey` FOREIGN KEY (`likeUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `View` ADD CONSTRAINT `View_viewPostId_fkey` FOREIGN KEY (`viewPostId`) REFERENCES `Post`(`postId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `View` ADD CONSTRAINT `View_viewUserId_fkey` FOREIGN KEY (`viewUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_followerUserId_fkey` FOREIGN KEY (`followerUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_followedUserId_fkey` FOREIGN KEY (`followedUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
