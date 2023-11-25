import prisma from "./client.js";

export default async function seed() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const demo = await prisma.user.create({ data: { name: "Demo User" } });
  const example = await prisma.user.create({ data: { name: "Example User" } });

  const post1 = await prisma.post.create({
    data: {
      title: "Post 1",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt. Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet nisi. Proin dignissim, lacus vitae mattis fermentum, dui dolor feugiat turpis, ut euismod libero purus eget dui.",
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Post 2",
      body: "Proin ut sollicitudin lacus. Mauris blandit, turpis in efficitur lobortis, lectus lacus dictum ipsum, vel pretium ex lacus id mauris. Aenean id nisi eget tortor viverra volutpat sagittis sit amet risus. Sed malesuada lectus eget metus sollicitudin porttitor. Fusce at sagittis ligula. Pellentesque vel sapien nulla. Morbi at purus sed nibh mollis ornare sed non magna. Nunc euismod ex purus, nec laoreet magna iaculis quis. Mauris non venenatis elit. Curabitur varius lectus nisl, vitae tempus felis tristique sit amet.",
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      message: "Another root comment",
      userId: demo.id,
      postId: post1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      message:
        "this is a root comment on this post. Try replying to this comment by clicking the reply button below.",
      userId: example.id,
      postId: post1.id,
    },
  });

  const comment8 = await prisma.comment.create({
    data: {
      message:
        "You can collapse the comments by clicking the line on the left of the block/section you want to hide. Give it a try!",
      parentId: comment2.id,
      userId: example.id,
      postId: post1.id,
    },
  });

  const comment4 = await prisma.comment.create({
    data: {
      message:
        "Multiple users can reply to the same comment, and they will be nested as well.",
      parentId: comment2.id,
      userId: example.id,
      postId: post1.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      message:
        "This is a reply to the above comment. You're the creator of this comment so you can edit and delete it.",
      parentId: comment2.id,
      userId: demo.id,
      postId: post1.id,
    },
  });

  const comment5 = await prisma.comment.create({
    data: {
      message:
        "You can also reply to your own comments. If you delete a comment, any nested comments will also be removed.",
      parentId: comment3.id,
      userId: demo.id,
      postId: post1.id,
    },
  });

  const comment6 = await prisma.comment.create({
    data: {
      message: "A reply by another user. Try deleting your comment above.",
      parentId: comment1.id,
      userId: example.id,
      postId: post1.id,
    },
  });

  const comment7 = await prisma.comment.create({
    data: {
      message: "The first comment on this post.",
      userId: example.id,
      postId: post2.id,
    },
  });
}

seed();
