import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui";

export function ItemTemplate({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
