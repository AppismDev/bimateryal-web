const { getAllNewMaterials } = require("./pages/NewMaterials/newMaterialsAPI");

const { getUserFromFirestore } = require("./services/firebase/UserService");
// Initialize Firebase
test("materials tests", async () => {
  // const result = render(<App />);
  const materials = await getAllNewMaterials();
  console.log(materials);
  expect(materials).not.toBeNull();
});

test("user tests", async () => {
  const user = await getUserFromFirestore("MhYFqEMUKjQ7MDol1wyYP4hfgQf1");
  expect(user).not.toBeNull();
});
