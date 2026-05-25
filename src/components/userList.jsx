import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserList = ({ users }) => {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-[rgba(79,221,60,0.14)] bg-white/90">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="text-neutral-600 dark:text-neutral-400">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UserList;
