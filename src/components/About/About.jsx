import "./About.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const timings = [
  { Day: "Sunday", Timing: "Closed" },
  { Day: "Monday", Timing: "10:00 am - 07:00 pm" },
  { Day: "Tuesday", Timing: "10:00 am - 07:00 pm" },
  { Day: "Wednesday", Timing: "10:00 am - 07:00 pm" },
  { Day: "Thursday", Timing: "10:00 am - 07:00 pm" },
  { Day: "Friday", Timing: "10:00 am - 07:00 pm" },
  { Day: "Saturday", Timing: "10:00 am - 03:00 pm" },
];

function About() {
  return (
    <div className="about-container" id="about">
      <h2 className="section-title">About Us</h2>
      <div className="table-container">
        <Table className="table-text max-w-[100vh]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Day</TableHead>
              <TableHead className="text-right">Timings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timings.map((timing) => (
              <TableRow key={timing.timing}>
                <TableCell className="font-medium">{timing.Day}</TableCell>
                <TableCell className="text-right">{timing.Timing}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <iframe
          width="100%"
          height="400"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1910%20G%20Street,%20NW%20(Between%2019th%20&amp;%2020th%20Sts)%20Washington,%20DC%2020006+(Tresses%20Salon)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </div>
    </div>
  );
}

export default About;
