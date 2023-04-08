import React from "react";
import { Checkbox, FocusTrap, Stack, TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import z from "zod";
import { useForm, zodResolver } from "@mantine/form";

type Props = {
	onSubmit(values: TodoFormValues): void;
	defaultValues?: Partial<TodoFormValues>;
};

const todoFormSchema = z.object({
	title: z.string().min(1, "Это поле обязательно!"),
	completed: z.boolean().default(false),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

const TodoForm = ({ onSubmit, defaultValues = {} }: Props) => {
	const form = useForm<TodoFormValues>({
		initialValues: {
			title: "",
			completed: false,
			...defaultValues,
		},
		validate: zodResolver(todoFormSchema),
	});

	const handleSubmit = (values: TodoFormValues) => {
		onSubmit(values);
		form.reset();
	};

	return (
		<FocusTrap active>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput
						label="Введите имя тудушки"
						{...form.getInputProps("title")}
					/>
					<Checkbox
						label="Статус"
						{...form.getInputProps("completed", { type: "checkbox" })}
					/>
					<Button color="violet" type="submit">
						Сохранить
					</Button>
				</Stack>
			</form>
		</FocusTrap>
	);
};

export default TodoForm;
