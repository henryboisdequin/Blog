import { Flex, IconButton } from "@chakra-ui/core";
import { useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async () =>
          await vote({
            postId: post.id,
            value: 1,
          })
        }
        icon="chevron-up"
        aria-label="Updoot"
      />
      {post.points}
      <IconButton
        onClick={async () =>
          await vote({
            postId: post.id,
            value: -1,
          })
        }
        icon="chevron-down"
        aria-label="Downdoot"
      />
    </Flex>
  );
};
