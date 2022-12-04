import { Stack, Text } from "@chakra-ui/react";
import { AdminLand } from "./AdminLand";
import { AdminPlot } from "./AdminPlot";
import { AdminScheme } from "./AdminScheme";
import { AdminTransaction } from "./AdminTransaction";
import { AdminUser } from "./AdminUser";

export const Admin = () => {
  return (
    <Stack>
      <Text size="xl">Users</Text>
      <AdminUser />
      <Text size="xl">Schemes</Text>
      <AdminScheme />
      <Text size="xl">Lands</Text>
      <AdminLand />
      <Text size="xl">Plots</Text>
      <AdminPlot />
      <Text size="xl">Transactions</Text>
      <AdminTransaction />
    </Stack>
  );
};
