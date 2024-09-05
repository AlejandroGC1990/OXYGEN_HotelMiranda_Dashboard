import "./__table.scss";

const Table = () => {
  const data = [
    {
      id: 1,
      name: "Pepe Pepito",
      email: "pepepepito@gmail.com",
      phone: "666.666.666",
      pounts: "5.0",
      comment:
        "Patata patata patata patata patata patata patata patata pata patata patata patata patata patata.",
    },
    {
      id: 1,
      name: "Pepe Pepito",
      email: "pepepepito@gmail.com",
      phone: "666.666.666",
      pounts: "5.0",
      comment:
        "Patata patata patata patata patata patata patata patata pata patata patata patata patata patata.",
    },
    {
      id: 1,
      name: "Pepe Pepito",
      email: "pepepepito@gmail.com",
      phone: "666.666.666",
      pounts: "5.0",
      comment:
        "Patata patata patata patata patata patata patata patata pata patata patata patata patata patata.",
    },
  ];

  return (
    <div className="table">
      <div className="table__containerSelectors">
        <div className="table__containerSelectors__selector">
          <p>All Contact</p>
        </div>
        <div className="table__containerSelectors__selector">
          <p>Archived</p>
        </div>
      </div>

      <table className="table__containerTable">
        <thead className="table__containerTable__header">
          <tr className="">
            <th>
              <strong>Order Id</strong>
            </th>
            <th>
              <strong>Date</strong>
            </th>
            <th>
              <strong>Customer</strong>
            </th>
            <th>
              <strong>Comment</strong>
            </th>
            <th>
              <strong>Action</strong>
            </th>
          </tr>
        </thead>

        <tbody className="table__containerTable__content">
          {/* mapeo de cada registro */}
          {data.map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <div>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                </div>
                <div>
                  <td>{row.pounts}</td>
                  <td>{row.comment}</td>
                </div>
                <td className="table__containerTable__content__register__actions">
                  <p>Publish</p>
                  <p>Archive</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
