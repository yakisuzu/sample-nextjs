import "@testing-library/jest-dom/extend-expect";
import { act, renderHook } from "@testing-library/react-hooks";

import { useCount } from "@/domain/UseCount";

describe("useCount", () => {
  it("countUp", async () => {
    // hooksサンプル
    const { result } = renderHook(() => useCount());

    expect(result.current.text()).toBe("count is 1");
    // hooks内のstate操作はact内で
    await act(async () => {
      result.current.countUp();
    });
    expect(result.current.text()).toBe("count is 2");
  });
});
