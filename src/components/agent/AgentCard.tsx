import { MoreVertical, Phone } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAgent } from "@/model/AgentModel";
import { useAppDispatch } from "@/redux/hooks";
import { SheetType } from "@/constants/sheet";
import { showSheet } from "@/redux/sheet";
import { useAgentMutation } from "@/hooks/mutations/useAgentMutation";
import { showDialog } from "@/redux/dialog";
import { DialogType } from "@/constants/dialog";

export const AgentCard = (props: { agent: IAgent & { _id: string } }) => {
  const { agent } = props;

  const dispatch = useAppDispatch();

  const { deleteAgentMutation } = useAgentMutation();

  const handleDelete = async () => {
    // try {
    //   await deleteAgentMutation.mutateAsync(agent._id);
    // } catch (error) {}

    dispatch(
      showDialog({
        type: DialogType.ConfirmActionDialog,
        props: {
          title: `Delete ${agent.name}`,
          description: "This action cannot be undone.",
          onConfirm: async () => {
            try {
              await deleteAgentMutation.mutateAsync(agent._id);
            } catch (error) {}
          },
          confirmLoading: deleteAgentMutation.isPending,
        },
      })
    );
  };

  const handleEdit = () => {
    dispatch(showSheet({ type: SheetType.ADD_AGENT, props: { agent } }));
  };

  const avatarInitials = agent?.name
    ?.split(" ")
    ?.map((name) => name[0])
    ?.slice(0, 2)
    ?.join("");

  return (
    <Card key={agent._id} className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarFallback>{avatarInitials}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{agent.name}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{agent.description}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="secondary" className="w-full">
          <Phone className="w-4 h-4 mr-2" />
          Call
        </Button>
      </CardFooter>
    </Card>
  );
};
