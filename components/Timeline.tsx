type TimelineItem = {
  time: string;
  title: string;
  details: string[];
};

const timelineItems: TimelineItem[] = [
  {
    time: "08:00 - 09:00",
    title: "ต้อนรับแขก",
    details: ["แขกเริ่มมาถึง / ลงทะเบียน / ถ่ายรูป"],
  },
  {
    time: "09:00 - 09:30",
    title: "ขบวนเจ้าบ่าว",
    details: ["ขบวน แห่ขันหมากแบบจีน"],
  },
  {
    time: "09:30 - 10:00",
    title: "ช่วงรับตัวเจ้าสาว",
    details: ["ผ่านประตูเงินประตูทอง / เจ้าบ่าวรับตัวเจ้าสาว"],
  },
  {
    time: "10:00 - 10:30",
    title: "พิธีหลัก",
    details: ["พิธี รับไหว้ / ยกน้ำชา"],
  },
  {
    time: "10:30 - 11:00",
    title: "เก็บภาพความทรงจำ",
    details: ["ถ่ายรูปครอบครัว"],
  },
  {
    time: "11:00 - 11:30",
    title: "พักเบรก",
    details: ["พักเบรก"],
  },
  {
    time: "11:30 - 13:30",
    title: "งานเลี้ยงอาหารกลางวัน",
    details: ["งานเลี้ยงอาหารกลางวัน"],
  },
  {
    time: "13:30 - 14:00",
    title: "ปิดงาน",
    details: ["ถ่ายรูป / ส่งแขก / จบงาน"],
  },
];

export default function Timeline() {
  return (
    <section className="bg-[var(--surface-main)] py-12">
      <div className="mx-auto w-full max-w-none px-4 md:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--accent-strong)] md:text-3xl">กำหนดการจัดงาน</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-[0.95fr_1.15fr_1.25fr] md:items-stretch">
          <aside className="order-3 rounded-2xl bg-white/70 p-4 shadow-sm md:order-1 md:flex md:h-full md:flex-col">
            <h3 className="mb-3 text-lg font-bold text-[var(--accent-strong)]">Map</h3>
            <iframe
              src="https://www.google.com/maps?q=Bangkok&output=embed"
              className="h-72 w-full rounded-xl border-0 md:h-full md:min-h-[580px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding map"
            />
          </aside>

          <div className="order-1 rounded-2xl bg-white/70 p-4 shadow-sm md:order-2">
            <h3 className="mb-3 text-lg font-bold text-[var(--accent-strong)]">Timeline</h3>
            <div className="space-y-4">
              {timelineItems.map((item) => (
                <article key={item.time + item.title} className="text-[var(--accent-strong)]">
                  <p className="text-sm font-bold text-[var(--theme-sunset)] md:text-base">{item.time}</p>
                  <p className="font-semibold md:text-lg">{item.title}</p>
                  {item.details.map((detail) => (
                    <p key={detail} className="text-sm md:text-base">{detail}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>

          <aside className="order-2 rounded-2xl bg-white/70 p-4 shadow-sm md:order-3 md:flex md:h-full md:flex-col md:p-6">
            <h3 className="mb-3 text-lg font-bold text-[var(--accent-strong)] md:mb-5 md:text-xl">Theme Colors</h3>
            <div className="space-y-3 text-left md:grid md:flex-1 md:grid-rows-3 md:gap-4 md:space-y-0">
              <div className="flex items-center gap-3 rounded-xl bg-[var(--theme-primary)]/15 p-3 md:h-full md:gap-4 md:p-4">
                <span className="h-8 w-8 rounded-full bg-[var(--theme-primary)] md:h-11 md:w-11" />
                <div>
                  <p className="text-sm font-semibold text-[var(--accent-strong)] md:text-base">Primary</p>
                  <p className="text-xs text-[var(--accent-strong)]/80 md:text-sm">#FFA725</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-[var(--theme-cream)] p-3 md:h-full md:gap-4 md:p-4">
                <span className="h-8 w-8 rounded-full border border-[var(--accent-strong)]/20 bg-[var(--theme-cream)] md:h-11 md:w-11" />
                <div>
                  <p className="text-sm font-semibold text-[var(--accent-strong)] md:text-base">Cream</p>
                  <p className="text-xs text-[var(--accent-strong)]/80 md:text-sm">#FFF5E4</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-[var(--theme-mint)]/35 p-3 md:h-full md:gap-4 md:p-4">
                <span className="h-8 w-8 rounded-full bg-[var(--theme-mint)] md:h-11 md:w-11" />
                <div>
                  <p className="text-sm font-semibold text-[var(--accent-strong)] md:text-base">Mint</p>
                  <p className="text-xs text-[var(--accent-strong)]/80 md:text-sm">#C1D8C3</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
