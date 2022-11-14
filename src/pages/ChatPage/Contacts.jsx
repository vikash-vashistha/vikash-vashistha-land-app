function Contacts({ users, active, onChange }) {
  return (
    <div>
      {users.map((user) => (
        <div
          style={{ background: active === user ? "tomato" : null }}
          key={user.id}
          onClick={() => onChange(user)}
        >
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
