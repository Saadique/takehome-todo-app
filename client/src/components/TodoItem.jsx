import { Badge, Box, Button, Card, Checkbox, Group, Text } from "@mantine/core";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <Card withBorder radius="md" p="md">
      <Group justify="space-between" align="flex-start">
        <Group align="flex-start" gap="sm">
          <Checkbox checked={todo.done} onChange={() => onToggle(todo.id)} />

          <Box>
            <Group gap="xs" align="center">
              <Text
                fw={600}
                style={{ textDecoration: todo.done ? "line-through" : "none" }}
              >
                {todo.title}
              </Text>

              {todo.done ? <Badge color="green" variant="light">Done</Badge> : null}
            </Group>

            {todo.description ? (
              <Text size="sm" c="dimmed" mt={4} style={{ whiteSpace: "pre-wrap" }}>
                {todo.description}
              </Text>
            ) : null}
          </Box>
        </Group>

        <Group gap="xs">
          <Button variant="light" size="xs" onClick={() => onEdit(todo)}>
            Edit
          </Button>
          <Button color="red" variant="light" size="xs" onClick={() => onDelete(todo.id)}>
            Delete
          </Button>
        </Group>
      </Group>
    </Card>
  );
}
