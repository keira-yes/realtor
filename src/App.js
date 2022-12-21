import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Apartments from "./pages/Apartments";
import HotOffers from "./pages/HotOffers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Apartments />} />
                    <Route path='/hot-offers' element={<HotOffers />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Navbar />
            </Router>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa neque porro saepe unde voluptate. Aliquam asperiores aut autem deserunt dolore doloribus ea eligendi eum eveniet, fugiat laudantium magni officia officiis omnis perspiciatis quae quidem quos sapiente sit sunt suscipit tempora veniam voluptas? Alias amet architecto consequatur dolores facilis in inventore iure laboriosam laudantium libero minus molestiae natus neque nesciunt, non nostrum obcaecati pariatur perferendis possimus quam quia reiciendis tenetur unde vitae voluptatum. Adipisci blanditiis delectus enim ipsam ipsum laborum magni necessitatibus perferendis sed. Ab blanditiis cum delectus dolorum error illo incidunt labore minus mollitia neque nesciunt nostrum perspiciatis provident, quaerat quam quod reiciendis rem repellat tempora unde. A aperiam at deserunt earum eius fugit ipsa maiores modi perspiciatis quisquam ratione reiciendis rem, reprehenderit sapiente sit. Ab consectetur dolor expedita illum ipsa molestias necessitatibus nulla porro possimus quia, reiciendis sapiente similique tempore ullam veniam voluptas voluptatum. Amet beatae commodi culpa delectus dicta dolores ea eos fugit, harum itaque iure magnam magni molestiae nam nostrum perferendis praesentium quas totam veritatis vero. Nisi, pariatur quaerat. Aperiam architecto beatae ea explicabo magnam molestiae, odit pariatur ratione rem unde vel velit, veniam voluptatem? Accusantium delectus est inventore, pariatur quidem ratione reiciendis! Dolores dolorum facere facilis harum illum mollitia, natus odit officiis praesentium quisquam rem temporibus vitae voluptas. Architecto asperiores assumenda beatae commodi eius eos, facilis id illo illum, impedit incidunt itaque libero magnam maxime minima molestias nemo nobis nulla odit officiis placeat praesentium provident quibusdam quidem similique sint temporibus unde veniam veritatis vitae voluptatem voluptates voluptatibus voluptatum! Accusamus accusantium, architecto culpa cumque debitis dolore doloremque doloribus est excepturi hic impedit in ipsam iusto modi molestias natus nemo odit quam quasi quidem quo reiciendis repudiandae saepe tenetur ullam veniam voluptas, voluptates. Aliquid, debitis dolor eum harum in quo! Adipisci asperiores atque cum dicta dignissimos dolorum est excepturi fugiat illo illum inventore ipsam iste labore libero nemo nesciunt nostrum officia, possimus quae quam quod quos repellat reprehenderit, rerum sed tempore vitae! Assumenda cupiditate debitis error expedita labore quae quaerat sequi. Aliquid amet distinctio ipsam molestiae nam recusandae ullam voluptate. Facere fugiat magni minima nam, neque nostrum reiciendis! Accusantium animi aperiam consequuntur dignissimos ex fuga voluptas voluptatem! A ab accusamus adipisci aperiam at consectetur consequatur corporis dignissimos distinctio, dolorum earum eius exercitationem explicabo fugiat fugit illo impedit iure placeat porro quae quas quasi quis quod ratione recusandae sed sequi sint velit vitae, voluptates. Dolorum eveniet, quidem. Autem est explicabo molestiae nihil, optio perferendis rerum sit sunt voluptatem voluptatibus? Dolores eius id labore natus nisi rerum soluta? Dolore minus, quasi. Alias blanditiis delectus ducimus eaque, earum eum illo magnam magni pariatur porro quaerat quo ratione repellat repudiandae tempora ut voluptate? Accusamus alias aliquid amet corporis cum distinctio dolorum, exercitationem explicabo facilis fuga, fugiat fugit ipsa ipsam laboriosam laudantium magni minima molestias nam pariatur quae quam quasi qui, quidem quisquam reiciendis rerum unde voluptates. Aperiam assumenda, dolore exercitationem facilis in ipsam iure laborum nisi numquam porro praesentium quas quidem, quo quod reiciendis vel vitae voluptas! Adipisci aliquam dignissimos ipsa similique!
        </>
    );
}

export default App;
