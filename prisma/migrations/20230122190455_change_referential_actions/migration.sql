-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_commentAuthorId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_commentPostId_fkey`;

-- DropForeignKey
ALTER TABLE `postmedia` DROP FOREIGN KEY `PostMedia_postMediaPostId_fkey`;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_postMediaPostId_fkey` FOREIGN KEY (`postMediaPostId`) REFERENCES `Post`(`postId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentPostId_fkey` FOREIGN KEY (`commentPostId`) REFERENCES `Post`(`postId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentAuthorId_fkey` FOREIGN KEY (`commentAuthorId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
