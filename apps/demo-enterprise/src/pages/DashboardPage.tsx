import { Title1, Body1, Card, CardHeader } from "@fluentui/react-components";

export const DashboardPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Title1>Welcome to the Dashboard</Title1>
      <Body1>
        This is a foundational view for the Enterprise Application Framework
        (EAF).
      </Body1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        <Card>
          <CardHeader header={<Title1>Metrics</Title1>} />
          <Body1>System is performing optimally.</Body1>
        </Card>
        <Card>
          <CardHeader header={<Title1>Recent Activity</Title1>} />
          <Body1>3 new users registered today.</Body1>
        </Card>
      </div>
    </div>
  );
};
