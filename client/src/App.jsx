import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Group,
  Loader,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";

import { modals } from "@mantine/modals";
import { api as todoApi } from "./api/todoApi";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const todoList = useMemo(() => todos.filter((todo) => !todo.done), [todos]);
  const doneList = useMemo(() => todos.filter((todo) => todo.done), [todos]);

  async function loadTodos() {
    setError('');
    setLoading(true);
    try {
      const data = await todoApi.fetchTodos();
      setTodos(data);
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function onCreate(event) {
    event.preventDefault();
    setError("");

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (trimmedTitle.length < 2) {
      setError('Title must be at least 2 characters');
      return;
    }

    setSaving(true);

    try {
      const created = await todoApi.createTodo({ title: trimmedTitle, description: trimmedDescription });
      setTodos((existing) => [created, ...existing]);
      setTitle("");
      setDescription("");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.details?.errors?.join(", ") ||
        error?.response?.data?.errors?.join(", ") ||
        error?.response?.data?.message;

      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  async function onToggle(id) {
    setError("");
    setTodos((existing) => existing.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));

    try {
      const updated = await todoApi.toggleDone(id);
      setTodos((existing) => existing.map((todo) => (todo.id === id ? updated : todo)));
    } catch (error) {
      await loadTodos();
      setError(error?.response?.data?.message);
    }
  }

  function openEdit(todo) {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditOpen(true);
  }

  async function saveEdit() {
    setError("");

    const trimmedTitle = editTitle.trim();
    const trimmedDescription = editDescription.trim();

    if (trimmedTitle.length < 2) {
      setError("Title must be at least 2 characters");
      return;
    }

    try {
      const updated = await todoApi.updateTodo(editId, { title: trimmedTitle, description: trimmedDescription });
      setTodos((existing) => existing.map((existingTodo) => (existingTodo.id === editId ? updated : existingTodo)));
      setEditOpen(false);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }

  function onDelete(id) {
    modals.openConfirmModal({
      title: "Delete task?",
      centered: true,
      children: (
        <Text size="sm" c="dimmed">
          This action cannot be undone. Are you sure you want to delete this task?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        setError("");

        const todosBeforeDelete = todos;
        setTodos((existing) => existing.filter((todo) => todo.id !== id));

        try {
          await todoApi.deleteTodo(id);
        } catch (error) {
          setTodos(todosBeforeDelete);
          setError(error?.response?.data?.message);
        }
      },
    });
  }


  return (
    <Container size="md" py={40}>
      <Center mb="md">
        <Stack gap={6} align="center">
          <Title order={1}>TODO App</Title>
          <Group gap="xs">
            <Badge variant="light">Total: {todos.length}</Badge>
            <Badge color="green" variant="light">Done: {doneList.length}</Badge>
            <Badge color="blue" variant="light">Todo: {todoList.length}</Badge>
          </Group>
        </Stack>
      </Center>

      <Card withBorder radius="md" p="lg" mb="lg">
        <form onSubmit={onCreate}>
          <Stack>
            <Text fw={600}>Add a new task</Text>
            <TextInput
              label="Title"
              placeholder="Car wash"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              label="Description (optional)"
              placeholder="Details…"
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Group justify="space-between">
              <Button type="submit" loading={saving}>
                Add TODO
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>

      {error ? (
        <Card withBorder radius="md" p="md" mb="lg" style={{ borderColor: "#ff6b6b" }}>
          <Text c="red" fw={600}>{error}</Text>
        </Card>
      ) : null}

      <Divider my="sm" label="Tasks" labelPosition="center" />

      {loading ? (
        <Center py={60}>
          <Stack align="center" gap="sm">
            <Loader />
            <Text c="dimmed">Loading your tasks…</Text>
          </Stack>
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt="lg">
          <Card withBorder radius="md" p="md" style={{ background: "#fcfcfd", maxHeight:620, overflowY:'auto' }}>
            <Group justify="space-between" mb="sm">
              <Text fw={700}>TODO</Text>
              <Badge variant="light">{todoList.length}</Badge>
            </Group>

            <Stack gap="sm">
              {todoList.length === 0 ? (
                <Card withBorder radius="md" p="md">
                  <Text c="dimmed">No pending tasks 🎉</Text>
                </Card>
              ) : (
                todoList.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={openEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </Stack>
          </Card>


          <Card withBorder radius="md" p="md" style={{ background: "#fcfcfd", maxHeight:620, overflowY:'auto' }}>
            <Group justify="space-between" mb="sm">
              <Text fw={700}>DONE</Text>
              <Badge color="green" variant="light">{doneList.length}</Badge>
            </Group>

            <Stack gap="sm">
              {doneList.length === 0 ? (
                <Card withBorder radius="md" p="md">
                  <Text c="dimmed">No completed tasks yet.</Text>
                </Card>
              ) : (
                doneList.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={openEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </Stack>
          </Card>

        </SimpleGrid>
      )}

      <Modal opened={editOpen} onClose={() => setEditOpen(false)} title="Edit task" centered>
        <Stack>
          <TextInput label="Title" value={editTitle} onChange={(event) => setEditTitle(event.target.value)} required />
          <Textarea
            label="Description"
            minRows={3}
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
