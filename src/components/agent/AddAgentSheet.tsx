"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch } from "@/redux/hooks";
import { hideSheet } from "@/redux/sheet";
import { useAgentMutation } from "@/hooks/mutations/useAgentMutation";
import { IAgent } from "@/model/AgentModel";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  instructions: z.string().min(10, {
    message: "Instructions must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export interface AddAgentSheetProps {
  agent?: IAgent & {
    _id: string;
  };
}

export function AddAgentSheet(props: AddAgentSheetProps) {
  const { agent } = props;

  const dispatch = useAppDispatch();

  const { addAgentMutation, updateAgentMutation } = useAgentMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: agent?.name || "",
      description: agent?.description || "",
      instructions: agent?.instructions || "",
    },
  });

  function handleClose() {
    dispatch(hideSheet());
  }

  async function onSubmit(values: FormValues) {
    console.log(values);

    try {
      if (agent) {
        await updateAgentMutation.mutateAsync({
          ...values,
          agentId: agent._id,
        });
      } else {
        await addAgentMutation.mutateAsync(values);
      }

      form.reset();

      handleClose();
    } catch (error) {}
  }

  return (
    <Sheet open onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>{agent ? "Update Agent" : "Add New Agent"}</SheetTitle>
          <SheetDescription>
            {agent
              ? "Update the agent by filling out the information below."
              : "Create a new agent by filling out the information below."}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Agent name" {...field} />
                  </FormControl>
                  <FormDescription>The name of your agent.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description" {...field} />
                  </FormControl>
                  <FormDescription>
                    A short description of the agent's purpose.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed instructions for the agent"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide clear instructions for the agent to follow.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={
                addAgentMutation.isPending || updateAgentMutation.isPending
              }
            >
              {agent ? "Update Agent" : "Add Agent"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
