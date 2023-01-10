-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT,
    "followerIds" TEXT[],
    "followingIds" TEXT[],
    "password" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "createdOn" TEXT NOT NULL,
    "profileImageUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "PostMediaItem" (
    "postMediaId" TEXT NOT NULL,
    "postMediaType" TEXT NOT NULL,
    "postMediaURL" TEXT NOT NULL,
    "postPostId" TEXT,

    CONSTRAINT "PostMediaItem_pkey" PRIMARY KEY ("postMediaId")
);

-- CreateTable
CREATE TABLE "Post" (
    "postUserId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "postCaption" TEXT NOT NULL,
    "postViews" TEXT[],
    "postLikes" TEXT[],
    "createdAt" TEXT NOT NULL,
    "createdOn" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" TEXT NOT NULL,
    "commentUserId" TEXT NOT NULL,
    "commentLikes" TEXT[],
    "commentContent" TEXT NOT NULL,
    "commentPostId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PostMediaItem" ADD CONSTRAINT "PostMediaItem_postPostId_fkey" FOREIGN KEY ("postPostId") REFERENCES "Post"("postId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postUserId_fkey" FOREIGN KEY ("postUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentPostId_fkey" FOREIGN KEY ("commentPostId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentUserId_fkey" FOREIGN KEY ("commentUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
