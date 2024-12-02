import { Badge } from '../ui/badge';

const FutureFeatures: React.FC = () => (
  <div className="w-full px-10">
    <div className="container mx-auto">
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
        <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
        <div className="flex gap-4 flex-col flex-1">
          <div>
            <Badge>Future Features</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-black text-3xl font-semibold">
              This is the start of something new
            </h2>
            <p className="text-gray-700">
              Loop is designed to bring collaborative travel planning to the
              next level. With future features like group voting and real-time
              collaboration, you and your team can easily make decisions, stay
              in sync, and plan every aspect of your trip or event together.
            </p>
          </div>
          <div className="flex gap-2 flex-col mt-6">
            <h3 className="text-black text-2xl font-semibold">
              What’s Coming Soon
            </h3>
            <div className="space-y-4 pl-6">
              <div className="flex items-start">
                <span className="text-xl text-blue-500 mr-2">🗳️</span>
                <p className="text-gray-700">
                  <strong>Group Voting</strong>: Let everyone have a say!
                  Members can vote on locations, accommodations, and activities
                  in real-time to make decisions as a group.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl text-blue-500 mr-2">🔄</span>
                <p className="text-gray-700">
                  <strong>Real-time Updates</strong>: Stay in sync with your
                  group. See changes, additions, and updates in real-time,
                  ensuring everyone is on the same page.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl text-blue-500 mr-2">📅</span>
                <p className="text-gray-700">
                  <strong>Collaborative Itinerary</strong>: Build your itinerary
                  together! Add, edit, and arrange activities as a team, while
                  keeping track of everyone’s preferences.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl text-blue-500 mr-2">🗂️</span>
                <p className="text-gray-700">
                  <strong>Shared Budgeting</strong>: Work together on tracking
                  expenses and managing budgets as a group. See who’s spent what
                  and how much is left in real-time.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl text-blue-500 mr-2">📍</span>
                <p className="text-gray-700">
                  <strong>Location-based Recommendations</strong>: Suggest
                  places and activities to your group based on everyone’s
                  preferences, and vote on the best options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FutureFeatures;
